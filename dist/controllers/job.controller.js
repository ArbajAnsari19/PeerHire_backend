"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobById = exports.getAllJobs = exports.createJob = void 0;
const Job_1 = require("../models/Job");
const createJob = async (req, res) => {
    try {
        const { title, description, budget, duration, skillsRequired } = req.body;
        const job = await Job_1.Job.create({
            title,
            description,
            budget,
            duration,
            skillsRequired,
            postedBy: req.user?.id,
        });
        res.status(201).json({ message: "Job posted", job });
    }
    catch (err) {
        res.status(500).json({ message: "Error creating job", error: err });
    }
};
exports.createJob = createJob;
const getAllJobs = async (req, res) => {
    try {
        const { skills } = req.query;
        let query = {};
        if (skills) {
            const skillsArray = skills.split(",");
            query = { skillsRequired: { $in: skillsArray } };
        }
        const jobs = await Job_1.Job.find(query).populate("postedBy", "name email");
        res.json(jobs);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching jobs", error: err });
    }
};
exports.getAllJobs = getAllJobs;
const getJobById = async (req, res) => {
    try {
        const job = await Job_1.Job.findById(req.params.jobId).populate("postedBy", "name email");
        if (!job)
            return res.status(404).json({ message: "Job not found" });
        res.json(job);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching job", error: err });
    }
};
exports.getJobById = getJobById;
