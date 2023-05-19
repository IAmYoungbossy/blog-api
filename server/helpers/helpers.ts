import http from "http";
import Debug from "debug";
const debug = Debug("src:server");

// Normalize a port into a number, string, or false.
export function normalizePort(val: string) {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) return val;
  // port number
  if (port >= 0) return port;

  return false;
}

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

// Event listener for HTTP server "listening" event.
export function onListening(
  server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >
) {
  const addr = server.address();
  const bind =
    typeof addr === "string"
      ? "pipe " + addr
      : "port " + addr?.port;
  debug("Listening on " + bind);
}
