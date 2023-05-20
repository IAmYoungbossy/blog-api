import express from "express";
import { regUser } from "../controllers/userController";

const router = express.Router();

// POST user Details to db.
router.post("/", regUser);

export default router;
