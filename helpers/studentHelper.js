const Student = require("../models/studentModel");

module.exports = {
  /**
   * Create a account with some credentials for students
   * @param {Object} data - { name, email, role, universityId, semester, collegeName, graduationYear, mobile, password, referralId }
   **/
  signup: (data) => {
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
      role,
    } = data;
    return new Promise(async (resolve, reject) => {
      try {
        if (
          !name ||
          !email ||
          !semester ||
          !mobile ||
          !password ||
          !role ||
          !universityId ||
          !collegeName
        ) {
          return reject({
            message: "Please provide all the required fields",
          });
        }

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
            role,
            universityId,
            collegeName,
          });
          if (role === "Indoor Student") {
            student.referralId = referralId;
            student.graduationYear = graduationYear;
          }
          await student.save();
          // Sent Activation token to email address
          // sentMail(email)
          resolve({
            message: "Account created successfully",
          });
        } else {
          reject({
            message: "Account already exists",
          });
        }
      } catch (error) {
        reject({
          message: error.message,
        });
      }
    });
  },
  /**
   * Create a account with some credentials for students
   * @param {String} email
   * @param {String} password
   **/
  login: (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!email || !password) {
          return reject({
            message: "Please provide all the required fields",
          });
        }

        // To find a data using the current credentials
        const studentFound = await Student.find({ email }).select("+password");

        if (studentFound.length >= 0) {
          const student = studentFound[0];

          if (student.status === "Active") {
            console.log(student.password);
            const isMatch = await Student.matchPasswords(student.password);
            if (isMatch) {
              resolve({ message: "Login Successfully", token: "67890" });
            } else {
              reject({ message: "Incorrect Credentials" });
            }
          } else {
            reject({ message: "Account is Deactivated" });
          }
        } else {
          reject({
            message: "Incorrect Credentials",
          });
        }
      } catch (error) {
        reject({
          message: error.message,
        });
      }
    });
  },
};