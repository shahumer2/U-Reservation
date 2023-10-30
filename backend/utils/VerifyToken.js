const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error.js");
const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(403, "token not found"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "token not verified"));

    req.user = user;
    console.log(req.user, "heys");
    next();
  });
};
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
      console.log(req.user, "yess");
    } else {
      return next(createError(403, "You are not Admin"));
    }
  });
};
module.exports = { verifyToken, verifyUser, verifyAdmin };
