require("dotenv").config({ path: "./config/config.env" });

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3001;
const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE || 86400000; // 1 day
const SERVER_HOST =
  process.env.SERVER_HOST || "https://but-jsd-4.herokuapp.com";

const SERVER = {
  NODE_ENV,
  PORT,
  ACCESS_TOKEN_EXPIRE,
  SERVER_HOST,
};

const DB_URI =
  process.env.DB_LOCAL_URI || "mongodb://localhost:27017/Eventogenic";

const MONGO = {
  DB_URI,
};

const CLIENT_HOST =
  process.env.CLIENT_HOST || "https://but-jsd-4.herokuapp.com";

const CLIENT = {
  CLIENT_HOST,
};

const JWT_ISSUER = process.env.JWT_ISSUER || "EVENTOGENIC";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "JHgiuigjewgb";
const JWT_ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRE || "1d";
const JWT_ACTIVATION_SECRET =
  process.env.JWT_ACTIVATION_SECRET || "udggkewqgjrb";
const JWT_ACTIVATION_EXPIRE = process.env.JWT_ACTIVATION_EXPIRE || "5m";
const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET || "bhjdsghfgbecetw";
const JWT_RESET_EXPIRE = process.env.JWT_RESET_EXPIRE || "5m";

const JWT = {
  JWT_ISSUER,
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRE,
  JWT_ACTIVATION_EXPIRE,
  JWT_ACTIVATION_SECRET,
  JWT_RESET_EXPIRE,
  JWT_RESET_SECRET,
};

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "API_KEY";
const FROM_MAIL = process.env.FROM_MAIL || "EMAIL";

const SENDGRID = {
  SENDGRID_API_KEY,
  FROM_MAIL,
};

const config = {
  SERVER,
  CLIENT,
  MONGO,
  JWT,
  SENDGRID,
};

module.exports = config;
