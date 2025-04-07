"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existing = await User_1.User.findOne({ email });
        if (existing) {
            res.status(400).json({ message: "Email already registered" });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await User_1.User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({
            message: "User registered",
            user: { id: user._id, email: user.email, role: user.role }
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error registering user", error: err });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({
            token,
            user: { id: user._id, email: user.email, role: user.role }
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error logging in", error: err });
    }
};
exports.login = login;
