import React from 'react';
import Map from '../components/Map'; // Asegúrate de que la ruta sea correcta

const MapPage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-4">Mapa de Taxis</h1>
      <Map/>
    </div>
  );
};

export default MapPage;