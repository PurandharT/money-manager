const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const transactionRoutes = require("./routes/transactions");

const app = express();

app.use(cors());
app.use(express.json());

//mongoose.connect("mongodb://127.0.0.1:27017/moneyDB")
mongoose.connect("mongodb+srv://PuriAdmin:Puri123@clustermoney.6qcrwhe.mongodb.net/?appName=ClusterMoney")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.use("/api/transactions", transactionRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});