import express from "express";
import {
  editComment,
  postComment,
  deleteComment,
} from "../controllers/commentController";

const router = express.Router();

// POST Create comment on blog post.
router.post("/:blogPostId", postComment);

// PATCH Edit comment on a blog post.
router.patch("/:commentId", editComment);

// DELETE Deletes comment on blog post.
router.delete("/:commentId", deleteComment);

export default router;
