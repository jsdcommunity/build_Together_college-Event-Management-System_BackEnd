const jwt = require("jsonwebtoken");
const config = require("../config/default");

const { JWT_ACCESS_SECRET, JWT_ACTIVATION_SECRET, JWT_RESET_SECRET } =
  config.JWT;

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
