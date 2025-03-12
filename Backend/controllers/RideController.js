const { validationResult } = require("express-validator");
const { createRide, getFare, confirmRide, startRide, endRide } = require("../services/rideService");
const {
  getCaptainsInTheRadius,
  getAddressCoordinate,
} = require("../services/maps.services");
const { sendMessageToSocketId } = require("../socket");
const RideModel = require("../models/RideModel");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);

    const pickupcoordinate = await getAddressCoordinate(pickup);
    //const destination = await getAddressCoordinate(destination);
    console.log("huehuehue");
    console.log(pickupcoordinate);

    const captainsInRadius = await getCaptainsInTheRadius(
      pickupcoordinate.ltd,
      pickupcoordinate.lng,
      5000
    );
    console.log("captainsss", captainsInRadius);

    ride.otp = "";
    const rideWithUser = await RideModel.findOne({ _id: ride._id }).populate(
      "user"
    );

    captainsInRadius.map(async (captain) => {
      console.log(captain, ride);
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
      const ride = await confirmRide({ rideId, captain: req.captain });

      sendMessageToSocketId(ride.user.socketId, {
          event: 'ride-confirmed',
          data: ride
      })

      return res.status(200).json(ride);
  } catch (err) {

      console.log(err);
      return res.status(500).json({ message: err.message });
  }
}

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
      const ride = await startRide({ rideId, otp, captain: req.captain });

      console.log(ride);

      sendMessageToSocketId(ride.user.socketId, {
          event: 'ride-started',
          data: ride
      })

      return res.status(200).json(ride);
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
}

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
      const ride = await endRide({ rideId, captain: req.captain });

      sendMessageToSocketId(ride.user.socketId, {
          event: 'ride-ended',
          data: ride
      })



      return res.status(200).json(ride);
  } catch (err) {
      return res.status(500).json({ message: err.message });
  } s
}
