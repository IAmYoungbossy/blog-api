import cors from "cors";
import http from "http";
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import conectToDb from "./config/db";
import errorHandler, {
  catchErrorAndForward,
} from "./middleware/errorMiddleware";
import { port } from "./utils/onError";
import { onError } from "./utils/onError";
import blogRouter from "./routes/blogRoutes";
import userRouter from "./routes/userRoutes";
import { onListening } from "./utils/onListening";
import commentRouter from "./routes/commentRoutes";

// Express app
const app = express();

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// User routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/comment", commentRouter);

// Admin routes
app.use("/api/v1/admin", blogRouter);

// forward 404 to error handler
app.use(catchErrorAndForward);

// error handler
app.use(errorHandler);

// Sets port
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Connects to db and listens for requests
conectToDb({
  port,
  server,
  onError,
  onListening: onListening.bind(null, server),
}).catch((err) => console.log(err));
