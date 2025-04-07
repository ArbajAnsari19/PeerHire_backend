import mongoose from "mongoose";

export interface IJob extends mongoose.Document {
  title: string;
  description: string;
  budget: number;
  duration: number;
  skillsRequired: string[];
  postedBy: mongoose.Types.ObjectId;
}

const JobSchema = new mongoose.Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    duration: { type: Number, required: true },
    skillsRequired: [{ type: String, required: true }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>("Job", JobSchema);
