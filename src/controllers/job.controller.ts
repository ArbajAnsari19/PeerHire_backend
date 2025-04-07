import { Request, Response } from "express";
import { Job } from "../models/Job";
import { AuthRequest } from "../middlewares/auth.middleware"; // Add this import


export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, budget, duration, skillsRequired } = req.body;

    const job = await Job.create({
      title,
      description,
      budget,
      duration,
      skillsRequired,
      postedBy: req.user?.id,
    });

    res.status(201).json({ message: "Job posted", job });
  } catch (err) {
    res.status(500).json({ message: "Error creating job", error: err });
  }
};

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const { skills } = req.query;

    let query = {};
    if (skills) {
      const skillsArray = (skills as string).split(",");
      query = { skillsRequired: { $in: skillsArray } };
    }

    const jobs = await Job.find(query).populate("postedBy", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<any> => {
  try {
    const job = await Job.findById(req.params.jobId).populate("postedBy", "name email");
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Error fetching job", error: err });
  }
};
