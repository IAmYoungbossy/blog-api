import http from "http";
import Debug from "debug";
const debug = Debug("src:server");

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
