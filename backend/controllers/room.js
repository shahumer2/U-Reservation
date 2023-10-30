const hotel = require("../models/hotel");
const room = require("../models/room");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new room(req.body);
  try {
    const savedRoom = await newRoom.save();
    await hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    res.status(200).send("Room CRetaed Successfully");
  } catch (error) {
    next(error);
  }
  next();
};
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
const AvailablityupdateRoom = async (req, res, next) => {
  try {
    await room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: { "roomNumbers.$.unavailableDates": req.body.dates },
      }
    );
  } catch (error) {
    next(error);
  }
};

//delete
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    });
    res.status(200).send("Room CRetaed Successfully");
  } catch (error) {
    next(error);
  }
  try {
    await room.findByIdAndDelete(req.params.id);
    res.status(200).json("delte successfully");
  } catch (error) {
    next(error);
  }
};

//get

const getRoom = async (req, res, next) => {
  try {
    const room = await room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

//findall

const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRoom,
  AvailablityupdateRoom,
};
