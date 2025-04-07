import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import jobRoutes from "./routes/job.routes";
import bidRoutes from "./routes/bid.routes";

dotenv.config();
const PORT = process.env.PORT || 5000;


const app = express();
app.use(express.json());
app.use (express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);app.use("/jobs", jobRoutes);
app.use("/jobs", jobRoutes);
app.use("/bids", bidRoutes);
app.get("/", (req, res) => {
  res.send("PeerHire Backend Running 🚀");
});

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
