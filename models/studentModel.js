const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_ISSUER = process.env.JWT_ISSUER || "EVENTOGENIC";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "JHgiuigjewgb";
const JWT_ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRE || "1d";
const JWT_ACTIVATION_SECRET =
  process.env.JWT_ACTIVATION_SECRET || "udggkewqgjrb";
const JWT_ACTIVATION_EXPIRE = process.env.JWT_ACTIVATION_EXPIRE || "5m";
const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET || "bhjdsghfgbecetw";
const JWT_RESET_EXPIRE = process.env.JWT_RESET_EXPIRE || "5m";

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    // validate:[isEmail,"Invalid Email"]
  },
  status: {
    type: String,
    default: "Inactive",
  },
  role: {
    type: String,
    required: true,
  },
  universityId: {
    type: String,
    required: true,
    unique: true,
  },
  referralId: {
    type: String,
    required: false,
  },
  semester: {
    type: Number,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: false,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  resetPasswdAccess: {
    type: Boolean,
    required: true,
    default: false,
  },
  lastResetPasswd: {
    type: Date,
    required: false,
  },
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(error.message, 400));
  }
});

studentSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateAccessToken = function () {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        studentId: this._id,
      },
      JWT_ACCESS_SECRET,
      {
        issuer: JWT_ISSUER,
        subject: "Access Token",
        audience: this.name,
        expiresIn: JWT_ACCESS_EXPIRE,
      },
      (err, token) => {
        if (err) {
          return reject({
            name: err.name,
            message: err.message,
            stack: err.stack,
          });
        }
        if (token) {
          resolve(token);
        } else {
          reject({ message: "Token Generation failed" });
        }
      }
    );
  });
};

studentSchema.methods.generateActivationToken = function () {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        studentId: this._id,
      },
      JWT_ACTIVATION_SECRET,
      {
        issuer: JWT_ISSUER,
        subject: "Activation Token",
        audience: this.name,
        expiresIn: JWT_ACTIVATION_EXPIRE,
      },
      (err, token) => {
        if (err) {
          return reject({
            name: err.name,
            message: err.message,
            stack: err.stack,
          });
        }
        if (token) {
          resolve(token);
        } else {
          reject({ message: "Token Generation failed" });
        }
      }
    );
  });
};

studentSchema.methods.generateResetToken = function () {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        studentId: this._id,
      },
      JWT_RESET_SECRET,
      {
        issuer: JWT_ISSUER,
        subject: "Activation Token",
        audience: this.name,
        expiresIn: JWT_RESET_EXPIRE,
      },
      (err, token) => {
        if (err) {
          return reject({
            name: err.name,
            message: err.message,
            stack: err.stack,
          });
        }
        if (token) {
          resolve(token);
        } else {
          reject({ message: "Token Generation failed" });
        }
      }
    );
  });
};


module.exports = model("Students", studentSchema);
