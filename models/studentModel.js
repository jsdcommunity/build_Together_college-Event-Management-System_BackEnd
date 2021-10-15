const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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
    return next(error);
  }
});

studentSchema.methods.matchPassword = (password) => {
  return bcrypt.compare(password, this.password);
};

module.exports = model("Students", studentSchema);
