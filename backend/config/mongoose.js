const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Databse connected");
    })
    .catch(() => {
      console.log("Database connection failed");
    });
};

module.exports = { connect };
