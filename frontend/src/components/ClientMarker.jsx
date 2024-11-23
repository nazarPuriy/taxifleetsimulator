import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Icono del cliente
const clientIcon = new L.Icon({
  iconUrl: '/user.png', // Asegúrate de tener esta imagen en public
  iconSize: [20, 20],
  iconAnchor: [10, 20],
  popupAnchor: [0, -20],
});

const ClientMarker = ({ position, id }) => {
  return (
    <Marker key={id} position={position} icon={clientIcon}>
      <Popup>Client waiting</Popup>
    </Marker>
  );
};

export default ClientMarker;
