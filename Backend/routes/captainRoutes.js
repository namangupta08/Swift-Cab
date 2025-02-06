const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerCaptain , loginCaptain, getCaptainProfile, logoutCaptain } = require("../controllers/CaptainController");
const { authCaptain } = require("../middlewares/auth.middleware");

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
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be atleast 3 character long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be atleast 3 character long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be atleast 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "auto", "motorcycle"])
      .withMessage("Invalid"),
  ],
  registerCaptain
);

router.post('/login' , 
    [
        body("email").isEmail().withMessage("Inavlid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be atleast 3 character long")
    ],
    loginCaptain
)

router.get('/profile' , authCaptain , getCaptainProfile)
router.get('/logout' , authCaptain , logoutCaptain)



module.exports = router;
