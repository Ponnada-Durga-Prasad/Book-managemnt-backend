const mongoose = require("mongoose");

const MyBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  status: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    trim: true,
    default: 1,
  },
});

const MyBook = mongoose.model("MyBook", MyBookSchema);
module.exports = MyBook;
