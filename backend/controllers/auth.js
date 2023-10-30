const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// here we dont directly put req.body in new user we sent them all individually as we have to provide security to the password bby hashing
module.exports.registerUser = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new user({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
module.exports.loginUser = async (req, res, next) => {
  try {
    const User = await user.findOne({ username: req.body.username });

    if (!User) return next(createError(404, "user not found"));
    const isPassword = await bcrypt.compareSync(
      req.body.password,
      User.password
    );
    if (!isPassword) return next(createError(404, "incorrrect password"));

    const token = jwt.sign(
      { id: User._id, isAdmin: User.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherdetails } = User._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherdetails }, isAdmin });
  } catch (error) {
    next(error);
  }
};
