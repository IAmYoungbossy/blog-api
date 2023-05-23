import express from "express";
import {
  regUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController";

const router = express.Router();

// POST authenticate user.
router.post("/login", loginUser);

// POST register new user.
router.post("/register", regUser);

// POST logs out user from account.
router.post("/logout", logoutUser);

// GET displays logged in user data.
router.get("/profile", getUserProfile);

// PUT updates user data in database.
router.put("/profile", updateUserProfile);

export default router;
