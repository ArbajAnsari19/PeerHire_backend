import mongoose from "mongoose";

const BidSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bidAmount: { type: Number, required: true },
    timeline: { type: Number, required: true }, // in days/weeks
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Bid = mongoose.model("Bid", BidSchema);
