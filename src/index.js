// login, logout routes,
//store http session in cookies,
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/booksRoutes");
const connectDB = require("./config/db");
const books = require("./routes/allBooksRoutes");
const app = express();

app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/mybooks", bookRoutes);
app.use("/collection", books);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server started and db connected`);
});
