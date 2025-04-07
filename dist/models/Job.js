"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    duration: { type: Number, required: true },
    skillsRequired: [{ type: String, required: true }],
    postedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.Job = mongoose_1.default.model("Job", JobSchema);
