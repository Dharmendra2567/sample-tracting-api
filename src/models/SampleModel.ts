// models/Sample.ts
import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    hospitalName: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "collected"],
      default: "pending",
    },
    collectedAt: { type: Date },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Sample", sampleSchema);
