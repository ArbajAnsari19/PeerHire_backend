import { Router } from "express";
import { createJob, getAllJobs, getJobById } from "../controllers/job.controller";
import { authenticate, verifyEmployer } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create",authenticate, verifyEmployer, createJob);
router.get("/",authenticate, getAllJobs);
router.get("/:jobId", getJobById);

export default router;
