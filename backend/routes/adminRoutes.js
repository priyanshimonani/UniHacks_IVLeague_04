import express from "express";
import {
  createOrUpdateOffice,
  getDashboard,
  callNext,
  togglePause,
  updateSettings
} from "../controllers/adminController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/office", protect, adminOnly, createOrUpdateOffice);
router.get("/dashboard", protect, adminOnly, getDashboard);
router.post("/call-next", protect, adminOnly, callNext);
router.post("/pause", protect, adminOnly, togglePause);
router.put("/settings", protect, adminOnly, updateSettings);

export default router;
