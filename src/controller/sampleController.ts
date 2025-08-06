// controllers/sampleController.ts
import { Request, Response } from "express";
import Sample from "../models/SampleModel";

// Create Sample
export const createSample = async (req: Request, res: Response) => {
  try {
    const { patientName, hospitalName, scheduledAt, agent } = req.body;

    if (!patientName || !hospitalName || !scheduledAt || !agent) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sample = await Sample.create({
      patientName,
      hospitalName,
      scheduledAt,
      agent,
    });

    res.status(201).json(sample);
  } catch (error) {
    res.status(500).json({ error: "Failed to create sample" });
  }
};

// Get All Samples
export const getAllSamples = async (_req: Request, res: Response) => {
  try {
    const samples = await Sample.find().populate("agent");
    res.status(200).json(samples);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch samples" });
  }
};

// Get Sample by ID
export const getSampleById = async (req: Request, res: Response) => {
  try {
    const sample = await Sample.findById(req.params.id).populate("agent");
    if (!sample) return res.status(404).json({ error: "Sample not found" });
    res.status(200).json(sample);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sample" });
  }
};

// Update Sample Status (pending or collected)
export const updateSampleStatus = async (req: Request, res: Response) => {
  try {
    console.log("Request body:", req.body); // ✅ Add this
    const { status } = req.body;

    if (!["pending", "collected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updateData: any = { status };
    if (status === "collected") {
      updateData.collectedAt = new Date();
    } else {
      updateData.collectedAt = null;
    }

    const updatedSample = await Sample.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    console.log("Updated sample:", updatedSample); // ✅ Add this

    if (!updatedSample)
      return res.status(404).json({ error: "Sample not found" });

    res.status(200).json(updatedSample);
  } catch (error) {
    console.error("Error updating status:", error); // ✅ Add this
    res.status(500).json({ error: "Failed to update status" });
  }
};


// Delete Sample
export const deleteSample = async (req: Request, res: Response) => {
  try {
    const sample = await Sample.findByIdAndDelete(req.params.id);
    if (!sample) return res.status(404).json({ error: "Sample not found" });
    res.status(200).json({ message: "Sample deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete sample" });
  }
};
