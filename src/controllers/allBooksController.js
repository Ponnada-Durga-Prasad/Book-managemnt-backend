const Books = require("../models/Books");
const getAllBooks = async function (req, res) {
  try {
    const books = await Books.find();
    console.log(books);
    if (books.length === 0) {
      return res.status(404).json({
        message: "There are no books",
      });
    }
    res.status(200).json({
      messsage: `Books fetched successfully`,
      books,
    });
  } catch (error) {}
};

module.exports = getAllBooks;
