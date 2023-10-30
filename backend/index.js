const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authroute = require("./routes/auth");
const hotelroute = require("./routes/hotel");
const roomroute = require("./routes/room");
const usersroute = require("./routes/users");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to db");
  } catch (error) {}
};

dotenv.config();
// if res.json then we are sending the obj if res , send then the plain data
app.use(cors());
// middleware
app.use(cookieparser());
app.use(express.json());
app.use("/api/auth", authroute);
app.use("/api/hotel", hotelroute);
app.use("/api/room", roomroute);
app.use("/api/user", usersroute);

app.use((err, req, res, next) => {
  const errstatus = err.status || 500;
  const errmsg = err.message || "something went wrong";
  return res.status(errstatus).json({
    success: false,
    message: errmsg,
    stack: err.stack,
  });
});
app.listen(8000, function () {
  connect();
  console.log("database is running");
});
