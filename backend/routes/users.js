const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
} = require("../controllers/user");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/VerifyToken");
const router = express.Router();

// router.get("/isAuthenticated", verifyToken, (req, res, next) => {
//   res.send("hello welcome");
// });
// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//   res.send("You can delete yourself");
// });
// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("You can delete anyone id");
// });
router.put("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/user/:id", verifyUser, getUser);
router.get("/", verifyAdmin, getAllUser);

module.exports = router;
