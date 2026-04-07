const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//mongoose.connect("mongodb://127.0.0.1:27017/moneyDB")
mongoose.connect("mongodb+srv://PuriAdmin:Puri123@clustermoney.6qcrwhe.mongodb.net/?appName=ClusterMoney")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const transactionRoutes = require("./routes/transactions");
app.use("/api/transactions", transactionRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});