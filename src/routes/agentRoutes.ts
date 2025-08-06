// src/routes/agentRoutes.ts
import express from "express";
import { registerAgent } from "../controller/agentController";

const router = express.Router();

router.post("/register", registerAgent);

export default router;
