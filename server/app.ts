import cors from "cors";
import path from "path";
import http from "http";
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import conectToDb from "./config/db";
import errorHandler, {
  catchErrorAndForward,
} from "./controllers/errorControllers";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import { onError, onListening, port } from "./helpers/helpers";

// Express app
const app = express();

// Middlewares
app.use(cors());
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
