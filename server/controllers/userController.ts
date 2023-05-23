import User from "../models/userModel";
import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";
import protectRoute from "../middleware/authMiddleware";

// @access Public
// @desc Register a new user
// @route POST /api/v1/user/register
export const regUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, lastName, firstName, avatar } =
      req.body;
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
  }
);

// @access Public
// @desc Authenticate user
// @route POST /api/v1/user/login
export const loginUser = asyncHandler(
  async (req: any, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(201).json();
      generateToken(res, user._id);
      res.redirect("/api/v1/user/profile");
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

// @access Private
// @desc Get user profile
// @route GET /api/v1/user/profile
export const getUserProfile = [
  protectRoute,
  asyncHandler(async (req: any, res) => {
    const { user } = req;
    res.status(200).json({ user });
  }),
];

// @access Private
// @desc Update user profile
// @route PUT /api/v1/user/profile
export const updateUserProfile = [
  protectRoute,
  asyncHandler(async (req: any, res) => {
    const user = await User.findById(req.user._id);
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
