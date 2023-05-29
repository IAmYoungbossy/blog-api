import express from "express";
import {
  regUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  likeOrUnlikeBlogPost,
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

// Delete deletes user data in database.
router.delete("/profile", deleteUserProfile);

// Post like or unlike a blog post.
router.post("/blog/:blogPostId", likeOrUnlikeBlogPost);

export default router;
