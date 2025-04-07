"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bid_controller_1 = require("../controllers/bid.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const bid_controller_2 = require("../controllers/bid.controller");
const auth_middleware_2 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/:jobId", auth_middleware_1.authenticate, auth_middleware_1.verifyFreelancer, bid_controller_1.placeBid);
router.get("/:jobId", auth_middleware_1.authenticate, bid_controller_1.getBidsByJob);
router.patch("/:bidId/accept", auth_middleware_1.authenticate, auth_middleware_2.verifyEmployer, bid_controller_2.acceptBid);
router.patch("/:bidId/reject", auth_middleware_1.authenticate, auth_middleware_2.verifyEmployer, bid_controller_2.rejectBid);
exports.default = router;
