const jwt = require("jsonwebtoken");

const authMiddleware = function (req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({
      message: "Access Denied! Please Login first",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthroirzed access!",
    });
  }
};

module.exports = authMiddleware;
