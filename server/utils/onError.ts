import { normalizePort } from "./normalizePort";

// Get port from environment and store in Express.
export const port = normalizePort(process.env.PORT || "5000");

// Event listener for HTTP server "error" event.
export interface CustomError extends Error {
  syscall: string;
  code: string;
}

export function onError(error: CustomError) {
  if (error.syscall !== "listen") throw error;

  const bind =
    typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}
