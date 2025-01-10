const userModel = require("../models/userModel");
const { createUser } = require("../services/userservice");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  console.log(req.body)

  const hashedPassowrd = await userModel.hashPassowrd(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname : fullname.lastname,
    email,
    password: hashedPassowrd,
  });

  const token = user.generateAuthToken();

  res.status(200).json({ token, user });
};
