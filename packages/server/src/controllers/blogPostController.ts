import {
  blogPostFormValidation,
  updateBlogPostFormValidation,
} from "../middleware/formValidation";
import asyncHandler from "express-async-handler";
import BlogPostModel from "../models/blogPostModel";
import { validationResult } from "express-validator";
import protectRoute from "../middleware/authMiddleware";

// @access Admin only
// @desc Create a new blog post
// @route POST /api/v1/admin/blog
export const createBlogPost = [
  protectRoute,
  ...blogPostFormValidation,
  asyncHandler(async (req, res) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const message = errors.array().map((err) => err.msg);

    if (errors.isEmpty()) {
      // Gets current user Id
      const postAuthor = req.body.user._id;

      // Checks if it's Admin
      const isAdmin = req.body.user.role === "admin";
      if (!isAdmin) {
        res.status(401);
        throw new Error("Not authorized user");
      } else {
        // Gets form data from req object
        const {
          postImage,
          postTitle,
          postBody,
          tags,
          category,
        } = req.body;

        // Adds all data together
        const inputData = {
          tags,
          postBody,
          postTitle,
          postImage,
          postAuthor,
          category,
        };

        // Creates post on database
        const blogPost = await BlogPostModel.create(inputData);
        res.status(201).json({ blogPost });
      }
    } else res.status(401).json({ message });
  }),
];

type statusType = "Published" | "Unpublished";

// @access Admin only
// @desc Update a blog post
// @route PUT /api/v1/admin/blog/:blogPostId
export const updateBlogPost = [
  protectRoute,
  ...updateBlogPostFormValidation,
  asyncHandler(async (req, res) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const message = errors.array().map((err) => err.msg);

    if (errors.isEmpty()) {
      const {
        tags,
        status,
        postBody,
        postTitle,
        postImage,
        postAuthor,
        category,
      } = req.body;

      // Checks if it's Admin
      const isAdmin = req.body.user.role === "admin";
      if (!isAdmin) {
        res.status(401);
        throw new Error("Not authorized user");
      } else {
        const { blogPostId } = req.params;

        const blogPost = await BlogPostModel.findById(
          blogPostId
        );

        if (!blogPost) {
          res
            .status(401)
            .json({ message: "Post doesn't exist" });
        } else {
          try {
            blogPost.postAuthor =
              postAuthor || blogPost.postAuthor;
            blogPost.category = category || blogPost.category;
            blogPost.tags = tags || blogPost.tags;
            blogPost.status =
              (status as statusType) || blogPost.status;
            blogPost.postBody = postBody || blogPost.postBody;
            blogPost.postTitle = postTitle || blogPost.postTitle;
            blogPost.postImage = postImage || blogPost.postImage;

            const postData = await blogPost.save();

            res.status(201).json(postData);
          } catch (err) {
            res.status(401);
            throw new Error("Something unexpected happend");
          }
        }
      }
    } else res.status(401).json({ message });
  }),
];

// @access Admin only
// @desc Updates blog post status
// @route PATCH /api/v1/admin/blog/:blogPostId
export const updatePostStatus = [
  protectRoute,
  asyncHandler(async (req, res) => {
    const { status } = req.body;

    // Checks if it's Admin
    const isAdmin = req.body.user.role === "admin";
    if (!isAdmin) {
      res.status(401);
      throw new Error("Not authorized user");
    } else {
      const { blogPostId } = req.params;
      const blogPost = await BlogPostModel.findById(blogPostId);

      if (!blogPost)
        res.status(401).json({ message: "Post doesn't exist" });
      else {
        try {
          blogPost.status =
            (status as statusType) || blogPost.status;

          const postData = await blogPost.save();

          res.status(201).json(postData);
        } catch (err) {
          res.status(401);
          throw new Error("Something unexpected happend");
        }
      }
    }
  }),
];

// @access Admin only
// @desc Deletes a blog post
// @route DELETE /api/v1/admin/blog/:blogPostId
export const deleteBlogPost = [
  protectRoute,
  asyncHandler(async (req, res) => {
    // Post Id
    const { blogPostId } = req.params;

    // Checks if it's Admin
    const isAdmin = req.body.user.role === "admin";
    if (!isAdmin) {
      res.status(401);
      throw new Error("Not authorized user");
    } else {
      try {
        await BlogPostModel.deleteOne({ _id: blogPostId });
        const message = "User profile successfully deleted";
        res.status(200).json({ message });
      } catch (err) {
        res.status(401);
        throw new Error("Something unexpected happend");
      }
    }
  }),
];
