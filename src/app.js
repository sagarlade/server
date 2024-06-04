const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Transaction =require("./models/paymentModel");
const stripe = require("stripe")(
  ""
);

require('./db/conn')
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/api/payment", async (req, res) => {
  const { fullname, amount } = req.body;


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Payment",
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/ViewTransactions",
    cancel_url: "http://localhost:3000/payment",
  });

  const transaction = new Transaction({
    fullname,
    amount,
    transactionId: session.id,
  });
  await transaction.save();

  res.json({ url: session.url });
});

app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find({});
  res.set('Access-Control-Allow-Origin', '*');
  res.json(transactions);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
