import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LiveTracking = () => {
  const [map, setMap] = useState(null); // Leaflet map instance
  const [marker, setMarker] = useState(null); // Leaflet marker instance
  const [currentPosition, setCurrentPosition] = useState({
    lat: -3.745,
    lng: -38.523,
  }); // Initial position

  // Initialize the map
  useEffect(() => {
    const mapInstance = L.map("map").setView(
      [currentPosition.lat, currentPosition.lng],
      15
    );

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance);

    // Add a marker
    const markerInstance = L.marker([currentPosition.lat, currentPosition.lng], {
      draggable: false, // Marker is not draggable
    }).addTo(mapInstance);

    setMap(mapInstance);
    setMarker(markerInstance);

    // Cleanup function to remove the map instance
    return () => {
      mapInstance.remove();
    };
  }, []);

  // Watch the user's position and update the map and marker
  useEffect(() => {
    if (!map || !marker) return;

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;

      // Update the current position state
      setCurrentPosition({ lat: latitude, lng: longitude });

      // Move the map view to the new position
      map.setView([latitude, longitude], 15);

      // Update the marker position
      marker.setLatLng([latitude, longitude]);

      console.log("Position updated:", latitude, longitude);
    });

    // Cleanup function to stop watching the position
    return () => navigator.geolocation.clearWatch(watchId);
  }, [map, marker]);

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default LiveTracking;