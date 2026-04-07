const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    person: String,
    amount: Number,
    type: String,
    purpose: String,
    remainingAmount: Number,
    
    status: { 
        type: String,
        default: "pending"
    },
        date: {
  type: Date,
  default: Date.now
},
    
    userId: String   // ✅ ADD THIS LINE
    
});


module.exports = mongoose.model("Transaction", transactionSchema);
