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
