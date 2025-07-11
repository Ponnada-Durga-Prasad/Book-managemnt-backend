const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const register = async function (req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // checking user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered, please try to login",
      });
    }

    // hasing password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, typeof hashedPassword);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error,
    });
  }
};
const userLogin = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "please enter email and password",
      });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({
        message: "User not found! Please register first",
      });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid creadentials please try again",
      });
    }

    const token = jwt.sign({ _id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // sending cookies

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};
const userLogout = async function (req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "logout successful",
  });
};
const userInfo = async function (req, res) {
  try {
    const userId = req.userId;

    const password = await User.findById(userId);
    res.status(200).json({
      userId,
      password,
    });
  } catch (error) {
    res.status(500).json({
      message: "Invalid token",
    });
  }
};

module.exports = {
  register,
  userLogin,
  userLogout,
  userInfo,
};
