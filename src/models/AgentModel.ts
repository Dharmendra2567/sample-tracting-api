import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";
import { v1 as uuidv1 } from "uuid";

// 1. Define a TypeScript interface
export interface AgentDocument extends Document {
  name: string;
  phone: string;
  email?: string;
  salt: string;
  hashed_password: string;
  password?: string; // virtual
  authenticate(password: string): boolean;
  encryptPassword(password: string): string;
  _password?: string; // we add this line to avoid TS error
}

// 2. Schema
const agentSchema = new Schema<AgentDocument>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    salt: { type: String },
    hashed_password: { type: String },
  },
  { timestamps: true }
);

// 3. Virtual for password (with fix)
agentSchema
  .virtual("password")
  .set(function (this: AgentDocument, password: string) {
    (this as AgentDocument)._password = password; // safely set
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function (this: AgentDocument) {
    return (this as AgentDocument)._password;
  });

// 4. Methods
agentSchema.methods = {
  encryptPassword: function (this: AgentDocument, password: string): string {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  authenticate: function (this: AgentDocument, plainText: string): boolean {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
};

// 5. Export model
export default mongoose.model<AgentDocument>("Agent", agentSchema);
