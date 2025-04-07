"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const bid_routes_1 = __importDefault(require("./routes/bid.routes"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/auth", auth_routes_1.default);
app.use("/jobs", job_routes_1.default);
app.use("/jobs", job_routes_1.default);
app.use("/bids", bid_routes_1.default);
app.get("/", (req, res) => {
    res.send("PeerHire Backend Running 🚀");
});
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
});
