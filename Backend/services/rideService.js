const RideModel = require("../models/RideModel");
const { getDistanceAndTime } = require("./maps.services");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destiation are required");
  }

  const distanceTime = await getDistanceAndTime(pickup, destination);
  const baseFare = {
    auto: 25,
    car: 30,
    moto: 15,
  };

  const perKmRate = {
    auto: 7,
    car: 9,
    moto: 5,
  };

  const perMinuteRate = {
    auto: 1,
    car: 1.5,
    moto: 0.75,
  };

  console.log(distanceTime);

  // Convert distance from meters to kilometers
  const distanceInKm = distanceTime.distance / 1000;
  // Convert duration from seconds to minutes
  const durationInMinutes = distanceTime.duration / 60;

  console.log("distance in km ", distanceInKm);
  console.log("time", durationInMinutes);

  const fare = {
    auto: Math.round(
      baseFare.auto +
        distanceInKm * perKmRate.auto +
        durationInMinutes * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        distanceInKm * perKmRate.car +
        durationInMinutes * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        distanceInKm * perKmRate.moto +
        durationInMinutes * perMinuteRate.moto
    ),
  };

  console.log(fare);

  return fare;
}

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All feilds are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = RideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports.getFare = getFare;

module.exports.confirmRide = async ({rideId , captain}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await RideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await RideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await RideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await RideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await RideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await RideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}