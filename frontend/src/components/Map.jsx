import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import CarMarker from './CarMarker';
import ClientMarker from './ClientMarker';

const Map = ({ cars, clients, isSimulationFinished }) => {

  // Componente para actualizar el tamaño del mapa cuando cambian las dimensiones
  const UpdateMap = () => {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize();
    }, [map]);
    return null;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Mostrar mensaje si la simulación ha terminado */}
      {isSimulationFinished && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 128, 0, 0.8)', // Fondo verde
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
            zIndex: 1000
          }}
        >
          ¡Simulación Finalizada!
        </div>
      )}

      {/* Map Container */}
      <MapContainer
        center={[48.1351, 11.582]} // Coordenadas iniciales (Munich, ejemplo)
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <UpdateMap />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Renderiza los vehículos */}
        {cars.map(car => (
          <CarMarker key={car.id} position={[car.coordX, car.coordY]} customerPosition={[car.customerCoordX, car.customerCoordY]} id={car.id} />
        ))}
        {/* Renderiza los clientes que están esperando servicio */}
        {clients.map(client => (
          <ClientMarker key={client.id} position={[client.coordX, client.coordY]} id={client.id} awaitingService={client.awaitingService} />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;





