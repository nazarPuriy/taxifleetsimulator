import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import CarMarker from './CarMarker';
import ClientMarker from './ClientMarker';
import { generateRandomPosition, generateRealisticTaxiPosition, getRandomInt } from '../utils/helpers';

const Map = () => {
  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([]);
  const nCars = 5

  useEffect(() => {
    // Initialize taxis and clients
    const initialCars = Array(nCars).fill().map((_, index) => ({
        id: index, // Use the index as the ID
        position: generateRealisticTaxiPosition([48.1351, 11.582]), // Munich
        path: [], // Start with empty path
      }));

    const initialClients = Array(10).fill().map(() => ({
      id: Math.random(),
      position: generateRandomPosition([48.1351, 11.582]), // Munich
    }));

    setCars(initialCars);
    setClients(initialClients);

    // Simulate taxi movement
    const interval = setInterval(() => {
      setCars(prevCars => prevCars.map(car => ({
        ...car,
        position: generateRealisticTaxiPosition(car.position), // Move the taxi
        path: [...car.path, car.position], // Update the path with the new position
      })));
    }, 5000); // Update every second

    return () => clearInterval(interval); // Cleanup when the component unmounts
  }, []);

  const UpdateMap = () => {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize();
    }, [map]);
    return null;
  };

  return (
    <MapContainer
      center={[48.1351, 11.582]} // Munich coordinates
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <UpdateMap />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Render taxis with their path */}
      {cars.map(car => (
        <CarMarker key={car.id} position={car.position} id={car.id} taxiPath={car.path} />
      ))}
      {/* Render clients */}
      {clients.map(client => (
        <ClientMarker key={client.id} position={client.position} id={client.id} />
      ))}
    </MapContainer>
  );
};

export default Map;


