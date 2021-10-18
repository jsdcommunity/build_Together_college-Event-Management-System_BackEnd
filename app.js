const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/dataBase");
const errorHandler = require("./middlewares/errorHandler");
const ErrorResponse = require("./classes/errorResponse");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

// Db connection
connectDatabase();

// Import all routes
const adminRouters = require("./routes/adminRouters");
const organizerRouters = require("./routes/organizerRouters");
const studentRouters = require("./routes/studentRouters");
const outdoorStudentRouters = require("./routes/outdoorStudentRouters");
const indoorStudentRouters = require("./routes/indoorStudentRouters");

app.use("/api/v1/admin", adminRouters);
app.use("/api/v1/organizer", organizerRouters);
app.use("/api/v1/student", studentRouters);
app.use("/api/v1/outdoor-student", outdoorStudentRouters);
app.use("/api/v1/indoor-student", indoorStudentRouters);

// 404 Route
app.use("*", (req, res, next) => {
  return next(new ErrorResponse("Not Found", 404));
});

// Error Handler
app.use(errorHandler);

module.exports = app;
