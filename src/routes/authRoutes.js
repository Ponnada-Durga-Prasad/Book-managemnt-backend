const express = require("express");
const {
  userInfo,
  userLogin,
  userLogout,
  register,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/me", authMiddleware, userInfo);

module.exports = router;
