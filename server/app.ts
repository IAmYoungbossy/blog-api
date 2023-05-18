import path from "path";
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import errorHandler, {
  catchErrorAndForward,
} from "./controllers/errorControllers";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(catchErrorAndForward);

// error handler
app.use(errorHandler);

export default app;
