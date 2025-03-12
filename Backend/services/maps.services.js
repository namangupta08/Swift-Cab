const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(
    address
  )}&format=json`;

  try {
    const response = await axios.get(url);

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        ltd: parseFloat(location.lat),
        lng: parseFloat(location.lon),
      };
    } else {
      throw new Error("Unable to fetch coordinates: Address not found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};

const geocode = async (address) => {
  const apiKey = "5b3ce3597851110001cf624826e791be6ca44768bb0a69073e483d10"; // Replace with your API key
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await axios.get(url);

    // Check if the response contains features
    if (response.data.features && response.data.features.length > 0) {
      const firstFeature = response.data.features[0];

      // Extract coordinates (longitude, latitude)
      const coordinates = firstFeature.geometry.coordinates;
      const longitude = coordinates[0];
      const latitude = coordinates[1];

      // Return coordinates as "longitude,latitude"
      return `${longitude},${latitude}`;
    } else {
      throw new Error(`Unable to geocode address: ${address}`);
    }
  } catch (error) {
    console.error("Geocoding error:", error.message);
    throw error;
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  const apiKey = "5b3ce3597851110001cf624826e791be6ca44768bb0a69073e483d10"; // Replace with your API key

  try {
    // Geocode origin and destination
    const originCoords = await geocode(origin);
    const destinationCoords = await geocode(destination);
    console.log("Origin Coordinates:", originCoords); // Debugging
    console.log("Destination Coordinates:", destinationCoords); // Debugging

    // Construct Directions API URL
    const url = `https://api.openrouteservice.org/v2/directions/cycling-regular?api_key=${apiKey}&start=${originCoords}&end=${destinationCoords}`;
    console.log("Directions URL:", url); // Debugging

    // Make the API request
    const response = await axios.get(url);
    console.log("API Response:", response.data); // Debugging

    // Check if the response contains features
    if (response.data.features && response.data.features.length > 0) {
      const feature = response.data.features[0];
      console.log("Feature:", feature); // Debugging

      // Check if the feature contains segments
      if (
        feature.properties &&
        feature.properties.segments &&
        feature.properties.segments.length > 0
      ) {
        const segment = feature.properties.segments[0];
        console.log("Segment:", segment); // Debugging

        // Ensure that segment contains the expected distance and duration
        if (segment.distance !== undefined && segment.duration !== undefined) {
          return {
            distance: segment.distance, // Distance in meters
            duration: segment.duration, // Duration in seconds
          };
        } else {
          console.error("Segment data is incomplete");
          return null;
        }
      } else {
        console.error("No segments found in the feature");
        return null;
      }
    } else {
      console.error("No features found in the response");
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }

  const apiKey = process.env.OPENROUTESERVICE_API_KEY;
  const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(
    input
  )}`;

  try {
    const response = await axios.get(url);

    // Check if the response contains features
    if (response.data.features && response.data.features.length > 0) {
      // Extract the 'label' property from each feature
      return response.data.features
        .map((feature) => feature.properties.label)
        .filter((value) => value);
    } else {
      // If no features are found, throw an error
      throw new Error("No suggestions found");
    }
  } catch (err) {
    console.error("Error fetching suggestions:", err.message);
    throw err;
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

  // radius in km


  const captains = await captainModel.find({
      location: {
          $geoWithin: {
              $centerSphere: [ [ ltd, lng ], radius / 6371 ]
          }
      }
  });

  return captains;


}
