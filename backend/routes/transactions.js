const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

// ➕ ADD TRANSACTION
router.post("/", auth, async (req, res) => {
  const newTransaction = new Transaction({
    ...req.body,
    userId: req.user.id
  });

  await newTransaction.save();
  res.json(newTransaction);
});

// 📥 GET ALL TRANSACTIONS (ONLY USER)
router.get("/", auth, async (req, res) => {
  const data = await Transaction.find({ userId: req.user.id });
  res.json(data);
});

// 💰 PAY
router.put("/pay/:id", auth, async (req, res) => {
  const { amount } = req.body;

  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) return res.status(404).json({ message: "Not found" });

  transaction.remainingAmount -= amount;

  if (transaction.remainingAmount <= 0) {
    transaction.status = "completed";
    transaction.remainingAmount = 0;
  } else {
    transaction.status = "partial";
  }

  await transaction.save();
  res.json(transaction);
});

// ✏️ EDIT
router.put("/:id", auth, async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

// 🗑 DELETE
router.delete("/:id", auth, async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;