import asyncHandler from "express-async-handler";
import CommentModel from "../models/commentModel";
import BlogPostModel from "../models/blogPostModel";
import { validationResult } from "express-validator";
import protectRoute from "../middleware/authMiddleware";
import { commentFormValidation } from "../middleware/formValidation";

// @access Private
// @desc Create comment on blog post
// @route POST /api/v1/user/comment/:blogPostId
export const postComment = [
  protectRoute,
  ...commentFormValidation,
  asyncHandler(async (req, res) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const message = errors.array().map((err) => err.msg);

    // Checks to see no error from client
    if (errors.isEmpty()) {
      const { comment } = req.body;
      const { blogPostId } = req.params;
      const commentAuthor = req.body.user._id;
      const data = { comment, commentAuthor };
      const blogPost = await BlogPostModel.findById(blogPostId);

      if (commentAuthor && blogPost) {
        const commentObj = await CommentModel.create(data);
        const commentId = commentObj._id;
        blogPost.comments.push(commentId);
        res.status(201).json(commentObj);
      } else {
        res.status(401);
        throw new Error("Oops! something unexpected happend");
      }
    } else res.status(401).json({ message });
  }),
];

// @access Private
// @desc Edit comment on blog post
// @route PATCH /api/v1/user/comment/:commentId
export const editComment = [
  protectRoute,
  ...commentFormValidation,
  asyncHandler(async (req, res) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const message = errors.array().map((err) => err.msg);

    // Checks to see no error from client
    if (errors.isEmpty()) {
      const { comment } = req.body;
      const { commentId } = req.params;
      const commentAuthor = req.body.user._id;
      const commentPost = await CommentModel.findById(commentId);

      if (commentAuthor && commentPost) {
        commentPost.comment = comment || commentPost.comment;
        const commentObj = await commentPost.save();
        res.status(201).json(commentObj);
      } else {
        res.status(401);
        throw new Error("Oops! something unexpected happend");
      }
    } else res.status(401).json({ message });
  }),
];
