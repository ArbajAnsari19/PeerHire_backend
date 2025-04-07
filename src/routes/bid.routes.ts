import express from "express";
import { placeBid, getBidsByJob } from "../controllers/bid.controller";
import { verifyFreelancer,authenticate } from "../middlewares/auth.middleware";
import { acceptBid, rejectBid } from "../controllers/bid.controller";
import { verifyEmployer } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/:jobId", authenticate, verifyFreelancer, placeBid);
router.get("/:jobId", authenticate, getBidsByJob);
router.patch("/:bidId/accept", authenticate, verifyEmployer, acceptBid);
router.patch("/:bidId/reject", authenticate, verifyEmployer, rejectBid);
export default router;
