import http from "http";

import { app } from "../app.js";

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val;

  if (port >= 0) return port;

  throw Error("Invalid port in env");
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind =
    typeof normalizePort === "string"
      ? "Pipe " + normalizePort
      : "Port " + normalizePort;

  switch (error.code) {
    case "EACCESS":
      console.error("Error: " + bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error("Error: " + bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "Pipe " + addr : "Port " + addr?.port;

  console.log("Listening on " + bind);
}

const port = normalizePort(process.env.APP_PORT);
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
