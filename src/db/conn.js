const express = require("express");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://sagar:lsagar@cluster0.xwigoj6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connection successful");
  })
  .catch((e) => {
    console.log("Error connecting to MongoDB:", e);
  });
