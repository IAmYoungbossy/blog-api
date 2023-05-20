import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Response } from "express";

type userIdType = Types.ObjectId;

const generateToken = (res: Response, userId: userIdType) => {
  // Get JWT secret from env variable
  const secret = process.env.JWT_SECRET || "secret";

  // Generate token with userId and secret
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "30d",
  });

  // Save token in cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateToken;
