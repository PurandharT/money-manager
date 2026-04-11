const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

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

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, // ✅ FIXED (important)
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    console.error("LOGIN ERROR:", err); // 🔥 THIS WILL SHOW REAL ERROR IN RENDER
    res.status(500).json({ message: "Server error ❌" });
  }
});

module.exports = router;