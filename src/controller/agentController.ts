// src/controllers/agentController.ts
import Agent from "../models/AgentModel";
import { Request, Response } from "express";

export const registerAgent = async (req: Request, res: Response) => {
  const { name, phone, email, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ error: "Name, phone, and password are required" });
  }

  try {
    const existing = await Agent.findOne({ phone });
    if (existing) {
      return res.status(409).json({ error: "Agent with this phone already exists" });
    }

    const agent = new Agent({ name, phone, email });
    agent.password = password; // triggers virtual setter

    await agent.save();
    res.status(201).json({
      message: "Agent registered successfully",
      agent: {
        id: agent._id,
        name: agent.name,
        phone: agent.phone,
        email: agent.email,
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};
