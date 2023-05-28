import express from "express";
import {
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
  updatePostStatus,
} from "../controllers/blogPostController";

const router = express.Router();

// POST Creates new blog post.
router.post("/blog", createBlogPost);

// PUT Updates in a blog post.
router.put("/blog/:blogPostId", updateBlogPost);

// DELETE Deletes a blog post.
router.delete("/blog/:blogPostId", deleteBlogPost);

// PATCH Updates status of a blog post.
router.patch("/blog/:blogPostId", updatePostStatus);

export default router;
