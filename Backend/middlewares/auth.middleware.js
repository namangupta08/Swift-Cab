const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers?.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Invalid user" });
  }
  const isBlacklisted = await userModel.findOne({token:token})
  if(isBlacklisted){
    return res.status(401).json({ message: "Unauthorised" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid user" });
  }
};
