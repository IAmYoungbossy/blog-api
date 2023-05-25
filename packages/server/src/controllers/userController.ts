import User from "../models/userModel";
import { Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";
import { validationResult } from "express-validator";
import protectRoute from "../middleware/authMiddleware";
import validateInputFields from "../utils/validateInputFields";

// @access Public
// @desc Register a new user
// @route POST /api/v1/user/register
export const regUser = [
  ...validateInputFields,
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password, lastName, firstName, avatar } =
      req.body;

    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const message = errors.array().map((err) => err.msg);

    if (errors.isEmpty()) {
      const userExist = await User.findOne({ email });

      // All required fields
      const reqData = { email, password, lastName, firstName };

      // Adds user avatar if its added during sign up
      const data = avatar ? { ...reqData, avatar } : reqData;

      if (userExist) {
        res.status(400);
        throw new Error("User already exists");
      }

      const user = await User.create(data);

      if (user) {
        generateToken(res, user._id);
        res.status(201).json({
          _id: user._id,
          email: user.email,
          avatar: user.avatar,
          lastName: user.lastName,
          firstName: user.firstName,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    } else res.status(401).json({ message });
  }),
];

// @access Public
// @desc Authenticate user
// @route POST /api/v1/user/login
export const loginUser = asyncHandler(
  async (req, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.redirect("/api/v1/user/profile");
    } else {
      res.status(400);
      req.body.invalidUser = true;
      throw new Error("Invalid user data");
    }
  }
);

// @access Private
// @desc Get user profile
// @route GET /api/v1/user/profile
export const getUserProfile = [
  protectRoute,
  asyncHandler(async (req, res) => {
    const { user } = req.body;
    res.status(200).json({ user });
  }),
];

// @access Private
// @desc Update user profile
// @route PUT /api/v1/user/profile
export const updateUserProfile = [
  protectRoute,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id);
    const { email, password, lastName, firstName, avatar } =
      req.body;
    if (user) {
      user.email = email || user.email;
      user.avatar = avatar || user.avatar;
      user.lastName = lastName || user.lastName;
      user.firstName = firstName || user.firstName;
      if (password) user.password = password;

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        lastName: updatedUser.lastName,
        firstName: updatedUser.firstName,
      });
    }
  }),
];

// @access Private
// @desc Logout user
// @route POST /api/v1/user/logout
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out" });
});

// @access Private
// @desc Delete user
// @route DELETE /api/v1/user/profile
export const deleteUserProfile = asyncHandler(
  async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
      try {
        const secret = process.env.JWT_SECRET || "secret";
        const decoded = jwt.verify(token, secret) as JwtPayload;
        const message = "User profile successfully deleted";
        await User.deleteOne({ _id: decoded.userId });
        res.status(200).json({ message });
      } catch (error) {
        res.status(500);
        throw new Error("Oops! something unexpected happened");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
