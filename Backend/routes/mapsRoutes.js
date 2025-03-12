const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/auth.middleware");
const {
  getCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions
} = require("../controllers/mapController");
const { query } = require("express-validator");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authMiddlewares.authUser,
  getCoordinates
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }), // Validate origin
  query("destination").isString().isLength({ min: 3 }), // Validate destination
  authMiddlewares.authUser,
  getDistanceTime
);

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authMiddlewares.authUser,
    getAutoCompleteSuggestions
)


module.exports = router;
