"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bid = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BidSchema = new mongoose_1.default.Schema({
    job: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Job", required: true },
    freelancer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    bidAmount: { type: Number, required: true },
    timeline: { type: Number, required: true }, // in days/weeks
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
}, { timestamps: true });
exports.Bid = mongoose_1.default.model("Bid", BidSchema);
