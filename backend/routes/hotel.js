const express = require("express");

const hotel = require("../models/hotel");
const room = require("../models/room");

const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/VerifyToken");
const router = express.Router();

//create

router.post("/register", async (req, res, next) => {
  const newHotel = new hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
});
//update
//new :true because it will send response of previous
router.put("/update/:id", verifyAdmin, async (req, res, next) => {
  try {
    const updatedHotel = await hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
});

//delete
router.delete("/delete/:id", verifyAdmin, async (req, res, next) => {
  try {
    await hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("delte successfully");
  } catch (error) {
    next(error);
  }
});

//get

router.get("/find/:id", async (req, res, next) => {
  try {
    const Hotel = await hotel.findById(req.params.id);
    res.status(200).json(Hotel);
  } catch (error) {
    next(error);
  }
});

//findall

router.get("/", async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const Hotels = await hotel
      .find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 9999 } })
      .limit(req.query.limit);
    res.status(200).json(Hotels);
  } catch (error) {
    next(error);
  }
});
// get hotel by city
// router.get("/countByCity", async (req, res, next) => {
//   try {
//     const Hotels = await hotel.find({ city });
//     res.status(200).json(Hotels);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/countByCity", async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
});
router.get("/countByType", async (req, res, next) => {
  try {
    const hotelCount = await hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await hotel.countDocuments({ type: "apartment" });
    const resortCount = await hotel.countDocuments({ type: "resort" });
    const villaCount = await hotel.countDocuments({ type: "villa" });
    const cabinCount = await hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
});
router.get("/rooms/:id", async (req, res, next) => {
  try {
    const Hotel = await hotel.findById(req.params.id);
    const list = await Promise.all(
      Hotel.rooms?.map((Room) => {
        return room.findById(Room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
