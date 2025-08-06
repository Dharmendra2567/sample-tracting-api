import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Agentrouter from "./routes/agentRoutes";
import sampleRoutes from "./routes/sampleRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (_req, res) => {
  res.send("Sample Tracking API is running...");
});
app.use("/api", Agentrouter);
app.use("/api/sample", sampleRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("Connected to MongoDB");
    
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
