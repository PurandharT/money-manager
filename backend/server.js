const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");

const transactionRoutes = require("./routes/transactions");
const authRoutes = require("./routes/auth");

const app = express();

require("dotenv").config();

// app.use(cors());

const cors = require("cors");

app.use(cors({
  origin: "https://money-manager-8ipz.vercel.app",
  credentials: true
}));


app.use(express.json());

// ✅ ONLY ONE MongoDB connection (USE ENV)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ ONLY ONE listen
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});