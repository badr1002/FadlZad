const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw "invalid email!"
          //throw new Error("invalid email!");
      },
    },
    password: { type: String, trim: true, required: true, min: 6, max: 50 },
    mobile: {
      type: String,
      trim: true,
      unique: true,
      required: true, 
      validate(value) {
        if (!validator.isMobilePhone(value.toString(), "ar-EG"))
          throw "invalid mobile!"
      },
     
    },
    activate: { type: Boolean, default: false },
    activeKeye: { type: String },
    about: { type: String },
    status: { type: Boolean, default: true },
    country: { type: String, default: "EGY" },
    image: { type: String, trim: true },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      zipCode: { type: String, trim: true },
      state: { type: String, trim: true },
    },
    tokens: [{ token: { type: String } }],
    role: {
      type: String,
      trim: true,
      default: "60f0c9ad82601330d46ec62a",
    },
     gender: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamp: true }
);

userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      parseFloat(process.env.SALT)
    );
  }
});

userSchema.statics.findUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user)
    throw new Error('email not found!')
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    throw new Error('invalid password!')
  return user
}


userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWTKEY)
  user.tokens = user.tokens.concat({ token })
  await user.save();
  return token
}

 
 

const User = mongoose.model("Users", userSchema, "Users");
module.exports = User;
