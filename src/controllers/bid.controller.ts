import { Response } from "express";
import { Bid } from "../models/Bid";
import { AuthRequest } from "../middlewares/auth.middleware";

export const placeBid = async (req: AuthRequest, res: Response) => {
  try {
    const { bidAmount, timeline, message } = req.body;
    const { jobId } = req.params;

    const bid = new Bid({
      job: jobId,
      freelancer: req.user?.id,
      bidAmount,
      timeline,
      message,
    });

    await bid.save();

    res.status(201).json({ message: "Bid placed successfully", bid });
  } catch (err) {
    res.status(500).json({ message: "Error placing bid", error: err });
  }
};

export const getBidsByJob = async (req: AuthRequest, res: Response) => {
  try {
    const { jobId } = req.params;

    const bids = await Bid.find({ job: jobId }).populate("freelancer", "name email");

    res.status(200).json({ bids });
  } catch (err) {
    res.status(500).json({ message: "Error fetching bids", error: err });
  }
};

export const acceptBid = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { bidId } = req.params;

    // Populate both job and its postedBy field
    const bid = await Bid.findById(bidId)
      .populate({
        path: 'job',
        populate: {
          path: 'postedBy'
        }
      });

    if (!bid) return res.status(404).json({ message: "Bid not found" });

    // Check if employer owns this job
    if ((bid.job as any).postedBy._id.toString() !== req.user?.id) {
      console.log("Employer ID:", (bid.job as any).postedBy._id.toString());
      console.log("Current User ID:", req.user?.id);  
      return res.status(403).json({ message: "Not authorized to accept this bid" });
    }

    bid.status = "Accepted";
    await bid.save();

    res.status(200).json({ message: "Bid accepted successfully", bid });
  } catch (err) {
    console.error(err); // Add this for debugging
    res.status(500).json({ message: "Error accepting bid", error: err });
  }
};

export const rejectBid = async (req: AuthRequest, res: Response):Promise<any>  => {
    try {
      const { bidId } = req.params;
  
      const bid = await Bid.findById(bidId).populate("job");
      if (!bid) return res.status(404).json({ message: "Bid not found" });
  
      if ((bid.job as any).postedBy.toString() !== req.user?.id) {
        return res.status(403).json({ message: "Not authorized to reject this bid" });
      }
  
      bid.status = "Rejected";
      await bid.save();
  
      res.status(200).json({ message: "Bid rejected successfully", bid });
    } catch (err) {
      res.status(500).json({ message: "Error rejecting bid", error: err });
    }
};