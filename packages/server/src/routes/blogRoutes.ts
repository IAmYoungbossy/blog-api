import express from "express";
import {
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
  updatePostStatus,
} from "../controllers/blogPostController";

const router = express.Router();

// PUT Updates a blog post.
router.put("/blog", updateBlogPost);

// POST Creates new blog post.
router.post("/blog", createBlogPost);

// DELETE Deletes a blog post.
router.delete("/blog", deleteBlogPost);

// PUT Updates publish status of a blog post.
router.put("/blog/status", updatePostStatus);

export default router;
