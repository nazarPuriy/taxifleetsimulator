import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  return (
    <MapContainer 
      center={[48.1351, 11.582]} // Coordenadas de Múnich
      zoom={13} 
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[48.1351, 11.582]}>
        <Popup>¡Hola desde Múnich!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;