const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Mongodb connected.."))
    .catch((error) => console.log("DB error: ", error));
}

module.exports = connectDB;
