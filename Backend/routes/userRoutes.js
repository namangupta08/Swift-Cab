const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser } = require("../controllers/UserController");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Inavlid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 character long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 3 character long"),
  ],
  registerUser
);

module.exports = router;

