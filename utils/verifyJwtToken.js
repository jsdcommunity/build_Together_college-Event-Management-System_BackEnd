const jwt = require("jsonwebtoken");

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "JHgiuigjewgb";
const JWT_ACTIVATION_SECRET =
  process.env.JWT_ACTIVATION_SECRET || "udggkewqgjrb";
const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET || "bhjdsghfgbecetw";

const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
      if (err) {
        return reject({
          name: err.name,
          message: err.message,
          stack: err.stack,
        });
      }
      if (decoded) {
        resolve(decoded);
      } else {
        reject({ message: "Token verification failed" });
      }
    });
  });
};

const verifyResetToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_RESET_SECRET, (err, decoded) => {
      if (err) {
        return reject({
          name: err.name,
          message: err.message,
          stack: err.stack,
        });
      }
      if (decoded) {
        resolve(decoded);
      } else {
        reject({ message: "Token verification failed" });
      }
    });
  });
};

const verifyActivationToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_ACTIVATION_SECRET, (err, decoded) => {
      if (err) {
        return reject({
          name: err.name,
          message: err.message,
          stack: err.stack,
        });
      }
      if (decoded) {
        resolve(decoded);
      } else {
        reject({ message: "Token verification failed" });
      }
    });
  });
};

module.exports = { verifyAccessToken, verifyActivationToken, verifyResetToken };
