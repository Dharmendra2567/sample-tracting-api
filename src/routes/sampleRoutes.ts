// routes/sampleRoutes.ts
import express from "express";
import {
  createSample,
  getAllSamples,
  getSampleById,
  updateSampleStatus,
  deleteSample,
} from "../controller/sampleController";

const router = express.Router();

// POST /samples - create sample
router.post("/add", createSample);

// GET /samples - get all samples
router.get("/getall", getAllSamples);

// GET /samples/:id - get single sample
router.get("/:id", getSampleById);

// PUT /samples/:id/status - update status (pending/collected)
router.patch("/:id/status", updateSampleStatus);

// DELETE /samples/:id - delete sample
router.delete("/:id", deleteSample);

export default router;
