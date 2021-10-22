const Student = require("../models/studentModel");
const sendMail = require("../utils/sentMail");
const config = require("../config/default");
const {
  verifyActivationToken,
  verifyResetToken,
} = require("../utils/verifyJwtToken");

const REFERRAL_ID = "REFERRAL";
const { CLIENT_HOST } = config.CLIENT;

/**
 * Create a account with some credentials for students
 * @param {Object} data - { name, email, role, universityId, semester, collegeName, graduationYear, mobile, password, referralId }
 **/
const signup = (data) => {
  const {
    name,
    email,
    universityId,
    referralId,
    semester,
    collegeName,
    graduationYear,
    mobile,
    password,
  } = data;
  return new Promise(async (resolve, reject) => {
    if (
      !name ||
      !email ||
      !semester ||
      !mobile ||
      !password ||
      !universityId ||
      !collegeName
    ) {
      return reject({
        message: "Please provide all the required fields",
      });
    }
    try {
      // To find a data using the current credentials
      const studentFound = await Student.find({
        $and: [{ $or: [{ email }, { mobile }, { universityId }] }],
      });

      if (studentFound.length <= 0) {
        const student = new Student({
          name,
          email,
          semester,
          mobile,
          password,
          universityId,
          collegeName,
        });
        if (referralId) {
          if (referralId === REFERRAL_ID) {
            student.role = "Indoor Student";
            student.referralId = referralId;
            student.graduationYear = graduationYear;
          } else {
            return reject({
              message: "Invalid ReferralId",
            });
          }
        }
        await student.save();
        const token = await student.generateActivationToken();
        data = {
          email: student.email,
          userName: student.name,
          type: "Activation",
          URL: `${CLIENT_HOST}/student/activation-token/${token}`,
        };
        await sendMail(data);
        resolve({
          message:
            "A link to activate your account has been emailed to the address provided",
        });
      } else {
        reject({
          message: "Account already exists",
        });
      }
    } catch (error) {
      reject({
        message: error.message,
        code: error.code || error.name,
      });
    }
  });
};

/**
 * Create a account with some credentials for students
 * @param {String} email
 * @param {String} password
 **/
const login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password) {
      return reject({
        message: "Please provide all the required fields",
      });
    }
    try {
      // To find a data using the current credentials
      const student = await Student.findOne({ email }).select("+password");
      const isMatch = student ? await student.matchPasswords(password) : null;

      if (student && isMatch) {
        if (student.verified) {
          const token = await student.generateAccessToken();
          resolve({ message: "Login Successfully", token });
        } else {
          const token = await student.generateActivationToken();
          data = {
            email: student.email,
            userName: student.name,
            type: "Activation",
            URL: `${CLIENT_HOST}/student/activation-token/${token}`,
          };
          await sendMail(data);
          reject({
            message:
              "This account is not active! A link to activate your account has been emailed to the address provided",
          });
        }
      } else {
        reject({
          message: "Incorrect email or password",
          statusCode: 401,
        });
      }
    } catch (error) {
      reject({
        message: error.message,
        code: error.code || error.name,
      });
    }
  });
};

/**
 * Activate a account by verifing password
 * @param {String} token
 * @param {String} password
 */
const activateAccount = (token, password) => {
  return new Promise(async (resolve, reject) => {
    if (!token || !password) {
      return reject({
        message: "Please provide all the required fields",
      });
    }
    try {
      // decode activation token
      const decoded = await verifyActivationToken(token);

      // To find a data using the current credentials
      const student = await Student.findById({
        _id: decoded.studentId,
      }).select("+password");

      if (student) {
        if (!student.verified) {
          const isMatch = await student.matchPasswords(password);
          if (isMatch) {
            student.verified = true;
            student.save();
            return resolve({ message: "Account Activated succesfully" });
          } else {
            reject({
              message: "Incorrect credential",
              statusCode: 401,
            });
          }
        } else {
          reject({ message: "Not Found", statusCode: 404 });
        }
      } else {
        reject({
          message: "Incorrect credential",
          statusCode: 401,
        });
      }
    } catch (error) {
      reject({
        message: error.message,
        code: error.code || error.name,
      });
    }
  });
};

/**
 * Forget Password for student
 * @param {String} email
 */
const forgetPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    if (!email) {
      return reject({
        message: "Please provide all the required fields",
      });
    }
    try {
      // To find a data using the current credentials
      const student = await Student.findOne({ email }).select("+password");

      if (student) {
        student.resetPasswdAccess = true;
        await student.save();
        const token = await student.generateResetToken();
        data = {
          email: student.email,
          userName: student.name,
          type: "Forget",
          URL: `${CLIENT_HOST}/student/reset-password/${token}`,
        };
        await sendMail(data);
        resolve({
          message:
            "A link to reset your password has been emailed to the address provided",
        });
      } else {
        reject({
          message: "Incorrect credential",
          statusCode: 401,
        });
      }
    } catch (error) {
      reject({
        message: error.message,
        code: error.code || error.name,
      });
    }
  });
};

/**
 * Reset password with acces token
 * @param {String} token
 * @param {String} password
 */
const resetPassword = (token, password) => {
  return new Promise(async (resolve, reject) => {
    if (!token || !password) {
      return reject({
        message: "Please provide all the required fields",
      });
    }
    try {
      // decode activation token
      const decoded = await verifyResetToken(token);

      // To find a data using the current credentials
      const student = await Student.findById({
        _id: decoded.studentId,
      }).select("+password");

      if (student) {
        if (student.resetPasswdAccess) {
          const isMatch = await student.matchPasswords(password);
          if (!isMatch) {
            student.password = password;
            student.lastResetPasswd = new Date();
            student.resetPasswdAccess = false;
            if (!student.verified) {
              student.verified = true;
            }
            await student.save();
            resolve({
              message: "Password Changed Successfully",
            });
          } else {
            reject({
              message: "New and old passwords are same",
            });
          }
        } else {
          reject({
            message: "Not Found",
            statusCode: 404,
          });
        }
      } else {
        reject({
          message: "Incorrect credential",
          statusCode: 401,
        });
      }
    } catch (error) {
      reject({
        message: error.message,
        code: error.code || error.name,
      });
    }
  });
};

module.exports = {
  signup,
  login,
  activateAccount,
  forgetPassword,
  resetPassword,
};
