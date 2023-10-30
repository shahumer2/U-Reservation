const express = require("express");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRoom,
  AvailablityupdateRoom,
} = require("../controllers/room");
const { verifyUser, verifyAdmin } = require("../utils/VerifyToken");

const router = express.Router();

router.post("/createroom/:hotelid", createRoom);
router.put("/update/:id", verifyUser, updateRoom);
router.put("/Availabilityupdate/:id", AvailablityupdateRoom);
router.delete("/delete/:id/:hotelid", verifyUser, deleteRoom);
router.get("/:id", getRoom);
router.get("/", verifyAdmin, getAllRoom);

module.exports = router;
