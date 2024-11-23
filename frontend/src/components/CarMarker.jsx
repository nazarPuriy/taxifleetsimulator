import React, { useState, useEffect } from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getTaxiPathColor } from '../utils/helpers'; // Import the function
import taxiIconUrl from '../assets/taxi.png';

const CarMarker = ({ position, id, taxiPath }) => {
  const taxiName = `Taxi #${id.toString().substring(2, 6)}`; // Taxi name based on id
  const [path, setPath] = useState(taxiPath || []); // Default to empty path if no path is provided

  const icon = new L.Icon({
    iconUrl: taxiIconUrl, // Example car icon
    iconSize: [30, 30], // Size of the icon
  });

  // Update path when position changes
  useEffect(() => {
    if (position) {
      setPath(prevPath => [...prevPath, position]); // Append new position to path
    }
  }, [position]);

  // Get the color for this taxi's path using the helper function
  const pathColor = getTaxiPathColor(id); // Call the helper function

  return (
    <>
      {/* Draw Polyline (the taxi path) */}
      <Polyline positions={path} color={pathColor} weight={4} />
      <Marker position={position} icon={icon}>
        <Popup>{taxiName}</Popup>
      </Marker>
    </>
  );
};

export default CarMarker;



