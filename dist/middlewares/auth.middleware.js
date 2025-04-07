"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.verifyFreelancer = exports.verifyEmployer = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Access token missing or malformed" });
        return;
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }
};
exports.verifyToken = verifyToken;
const verifyEmployer = (req, res, next) => {
    console.log("Verifying employer role...");
    if (req.user?.role !== "employer") {
        res.status(403).json({ message: "Access denied: Employers only" });
        return;
    }
    console.log("Employer Verified");
    next();
};
exports.verifyEmployer = verifyEmployer;
const verifyFreelancer = (req, res, next) => {
    if (req.user?.role !== "freelancer") {
        res.status(403).json({ message: "Access denied: Freelancers only" });
        return;
    }
    next();
};
exports.verifyFreelancer = verifyFreelancer;
const authenticate = (req, res, next) => {
    console.log("Authenticating user...");
    (0, exports.verifyToken)(req, res, next);
    console.log("User authenticated");
};
exports.authenticate = authenticate;
