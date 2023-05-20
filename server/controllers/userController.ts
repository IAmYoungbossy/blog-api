import User from "../models/user";
import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";

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
