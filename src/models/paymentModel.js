
const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
  fullname: String,
  amount: Number,
  transactionId: String,
});

const Transaction = mongoose.model("Transaction", TransactionSchema);


module.exports = Transaction;