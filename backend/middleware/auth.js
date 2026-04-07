const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // const token = req.headers.authorization;
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, access denied ❌" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded; // contains user id
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token ❌" });
  }
};

module.exports = auth;