const UserBooks = require("../models/MyBooks");
const Books = require("../models/Books");
const getMyBooks = async (req, res) => {
  try {
    const userId = req.userId;

    // Find all userBooks and populate bookId with book data
    const userBooks = await UserBooks.find({ userId }).populate("bookId");

    if (!userBooks || userBooks.length === 0) {
      return res.status(404).json({
        message: "No books found",
        books: [],
      });
    }

    // Merge book info with user-specific status and rating
    const books = userBooks.map((entry) => ({
      _id: entry._id, // _id of UserBooks
      bookId: entry.bookId._id, // actual Book _id
      title: entry.bookId.title,
      author: entry.bookId.author,
      coverImage: entry.bookId.coverImage,
      status: entry.status,
      rating: entry.rating,
    }));

    res.status(200).json({
      message: "Books fetched successfully",
      books,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const AddMyBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.userId;
    console.log(userId);
    const bookExists = await Books.findById(bookId);

    if (!bookExists) {
      return res.status(404).json({
        message: "book not found to add",
      });
    }
    const bookPresent = await UserBooks.findOne({ bookId, userId });
    console.log("book present", bookPresent);

    if (bookPresent) {
      return res.status(400).json({
        message: "already added book",
      });
    }
    const addUserBook = new UserBooks({ userId, bookId });
    await addUserBook.save();
    res.status(200).json({
      message: "book added succesfully to your list",
    });
  } catch (error) {
    res.status(500).json({
      messge: "Internal server error",
      error,
    });
  }
};

const UpdateBookStatus = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId, status } = req.body;

    const isBookExists = await UserBooks.findOne({ userId, _id: bookId });
    if (!isBookExists) {
      return res.status(404).json({
        message: "Book not found to modify",
      });
    }

    await UserBooks.updateOne({ userId, _id: bookId }, { $set: { status } });

    res.status(200).json({
      message: "Book status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error,
    });
  }
};

const UpdateBookRating = async (req, res) => {
  try {
    const { rating, bookId } = req.body;
    const userId = req.userId;

    const findBook = await UserBooks.findOne({ userId, _id: bookId });
    if (!findBook) {
      return res.status(404).json({
        message: "Book not found in your gallery",
      });
    }

    await UserBooks.updateOne({ userId, _id: bookId }, { $set: { rating } });

    res.status(200).json({
      message: "Ratings updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error,
    });
  }
};

module.exports = { AddMyBook, getMyBooks, UpdateBookRating, UpdateBookStatus };
