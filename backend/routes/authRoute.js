import express from "express";
import {
  registerUser,
  loginUser,
  registerAdmin,
  loginAdmin,
} from "../controllers/authcontroller.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/user/register", registerUser);
router.post("/user/login", loginUser);


router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

router.get("/admin/protected", protect, adminOnly, (req, res) => {
  res.json({ message: "Admin access granted" });
});
 
export default router;  
