import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Access token missing or malformed" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};

export const verifyEmployer = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "employer") {
    res.status(403).json({ message: "Access denied: Employers only" });
    return;
  }
  next();
};

export const verifyFreelancer = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "freelancer") {
    res.status(403).json({ message: "Access denied: Freelancers only" });
    return;
  }
  next();
};

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  verifyToken(req, res, next);
};