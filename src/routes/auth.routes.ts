import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;

