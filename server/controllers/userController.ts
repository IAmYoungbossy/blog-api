import User from "../models/userModel";
import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";

// @access Public
// @route POST /api/v1/user
// @desc Register a new user
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
// @route POST /api/v1/user/auth
export const authUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne(email);

    if (user && (await user.matchPassword(password))) {
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

// @access Private
// desc Logout user
// POST /api/v1/user/logout
export const logoutUser = asyncHandler(
  async (req: Request, res: Response) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out" });
  }
);
