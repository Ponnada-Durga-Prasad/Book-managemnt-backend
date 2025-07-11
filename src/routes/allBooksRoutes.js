const express = require("express");
const getAllBooks = require("../controllers/allBooksController");

const router = express.Router();

router.get("/books", getAllBooks); // public on this route

module.exports = router;
