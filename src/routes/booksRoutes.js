const express = require("express");
const {
  getMyBooks,
  UpdateBookRating,
  UpdateBookStatus,
  AddMyBook,
} = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getMyBooks);
router.post("/:bookId", authMiddleware, AddMyBook);
router.patch("/status", authMiddleware, UpdateBookStatus);
router.patch("/rating", authMiddleware, UpdateBookRating);
module.exports = router;
