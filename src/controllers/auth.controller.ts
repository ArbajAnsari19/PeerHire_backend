import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ 
      message: "User registered", 
      user: { id: user._id, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: "7d" }
    );

    res.json({ 
      token, 
      user: { id: user._id, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
};