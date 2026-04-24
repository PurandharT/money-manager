const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const transactionRoutes = require("./routes/transactions");
const authRoutes = require("./routes/auth");

const app = express();

// ✅ CORS (allow Vercel frontend)
const allowedOrigins = [
  "https://money-manager-8ipz.vercel.app",
  "http://localhost:3000"
];

app.use(cors({

  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    let hostname = "";
    try {
      hostname = new URL(origin).hostname;
    } catch (err) {
      return callback(new Error("Invalid origin"));
    }

    const isAllowed =
      allowedOrigins.includes(origin) || /\.vercel\.app$/.test(hostname);

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("Mongo Error:", err));

// ✅ Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Health check (optional but useful)
app.get("/api", (req, res) => {
  res.json({ message: "Backend working ✅" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});