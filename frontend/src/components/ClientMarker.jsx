import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Icono del cliente
const clientIcon = (hasArrived) => new L.Icon({
  iconUrl: hasArrived ? '/user_arrived.png' : '/user.png', // Cambia el icono si ha llegado
  iconSize: [20, 20],
  iconAnchor: [10, 20],
  popupAnchor: [0, -20],
});

const ClientMarker = ({ position, destination, id, awaitingService }) => {
  const hasArrived = !awaitingService;

  return (
    <Marker key={id} position={position} icon={clientIcon(hasArrived)}>
      <Popup>
        {hasArrived ? 'Client has arrived at the destination.' : 'Client waiting'}
      </Popup>
    </Marker>
  );
};

export default ClientMarker;

