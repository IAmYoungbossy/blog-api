import asyncHandler from "express-async-handler";
import BlogPostModel from "../models/blogPostModel";
import protectRoute from "../middleware/authMiddleware";

// @access Admin only
// @desc Create a new blog post
// @route POST /api/v1/admin/blog
export const createBlogPost = [
  protectRoute,
  asyncHandler(async (req, res) => {
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
        categories,
      } = req.body;

      // Adds all data together
      const inputData = {
        tags,
        postBody,
        postTitle,
        postImage,
        postAuthor,
        categories,
      };

      // Creates post on database
      const blogPost = await BlogPostModel.create(inputData);
      res.status(201).json({ blogPost });
    }
  }),
];

type statusType = "Published" | "Unpublished";

// @access Admin only
// @desc Create a new blog post
// @route PUT /api/v1/admin/blog
export const updateBlogPost = [
  protectRoute,
  asyncHandler(async (req, res) => {
    const {
      tags,
      status,
      postBody,
      postTitle,
      postImage,
      postAuthor,
      categories,
    } = req.body;

    // Checks if it's Admin
    const isAdmin = req.body.user.role === "admin";
    if (!isAdmin) {
      res.status(401);
      throw new Error("Not authorized user");
    } else {
      const { id } = req.params;

      const blogPost = await BlogPostModel.findById(id);

      if (!blogPost) {
        res.status(401).json({ message: "Post doesn't exist" });
      } else {
        try {
          blogPost.postAuthor =
            postAuthor || blogPost.postAuthor;
          blogPost.categories =
            categories || blogPost.categories;
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
  }),
];

// @access Admin only
// @desc Create a new blog post
// @route PUT /api/v1/admin/blog/status
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
      const { id } = req.params;
      const blogPost = await BlogPostModel.findById(id);

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
// @desc Create a new blog post
// @route DELETE /api/v1/admin/blog/delete
export const deletePostStatus = [
  protectRoute,
  asyncHandler(async (req, res) => {
    // Post Id
    const { id } = req.params;

    // Checks if it's Admin
    const isAdmin = req.body.user.role === "admin";
    if (!isAdmin) {
      res.status(401);
      throw new Error("Not authorized user");
    } else {
      try {
        await BlogPostModel.deleteOne({ _id: id });
        const message = "User profile successfully deleted";
        res.status(201).json({ message });
      } catch (err) {
        res.status(401);
        throw new Error("Something unexpected happend");
      }
    }
  }),
];
