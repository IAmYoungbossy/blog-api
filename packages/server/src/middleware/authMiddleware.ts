import User from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const secret = process.env.JWT_SECRET || "secret";
      const decoded = jwt.verify(token, secret) as JwtPayload;
      req.body.user = await User.findById(decoded.userId).select(
        "-password"
      );
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default protectRoute;
