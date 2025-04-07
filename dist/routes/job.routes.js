"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const job_controller_1 = require("../controllers/job.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/create", auth_middleware_1.authenticate, auth_middleware_1.verifyEmployer, job_controller_1.createJob);
router.get("/", auth_middleware_1.authenticate, job_controller_1.getAllJobs);
router.get("/:jobId", job_controller_1.getJobById);
exports.default = router;
