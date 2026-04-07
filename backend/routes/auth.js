const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // ❗ Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists ❌" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashed
  });

  await user.save();

  res.json({ message: "User created ✅" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 🔍 Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found ❌" });
  }

  // 🔐 Check password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Wrong password ❌" });
  }

  // ✅ Generate token
  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ token });
});

module.exports = router;