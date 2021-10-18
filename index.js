const http = require("http"),
  app = require("./app");
server = http.createServer(app);

const config = require("./config/default");

const { PORT, NODE_ENV } = config.SERVER;

app.set("port", PORT);

server.listen(PORT);

server.on("listening", onListen);
server.on("error", onError);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListen() {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} mode`);
}

// handling uncaughtException and unhandledRejection
process
  .on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  })
  .on("uncaughtException", (err, origin) => {
    console.error("Uncaught Exception thrown", err, "on", origin);
  });
