import express from "express";
import {
  createOrganization,
  getAdminOrganizations,
  getDashboard,
  callNext,
  updateQueueStatus,
  updateSettings,
  getQRCode
} from "../controllers/adminController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/organizations", protect, adminOnly, createOrganization);
router.get("/organizations", protect, adminOnly, getAdminOrganizations);
router.get("/dashboard", protect, adminOnly, getDashboard);
router.post("/call-next", protect, adminOnly, callNext);
router.post("/status", protect, adminOnly, updateQueueStatus);
router.put("/settings", protect, adminOnly, updateSettings);
router.get("/qr/:organizationId", protect, adminOnly, getQRCode);

export default router;
