require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/dataBase");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

// Db connection
connectDatabase();

// Import all routes
const sample = require("./routes/sample");

app.use("/api/v1", sample);

module.exports = app;
