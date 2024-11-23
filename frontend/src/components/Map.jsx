import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import CarMarker from './CarMarker';
import ClientMarker from './ClientMarker';
import { getVehicles } from '../api/vehicleApi'; // Importamos la función para obtener vehículos

const Map = ({ scenario }) => {
  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([]);

  // Función para actualizar vehículos desde la API
  const updateVehicles = async (scenarioId) => {
    if (!scenarioId) return;

    try {
      const vehicles = await getVehicles(scenarioId); // Llama a la API para obtener vehículos
      console.log(vehicles)
      setCars(
        vehicles.map(vehicle => ({
          id: vehicle.id,
          position: [vehicle.coordX, vehicle.coordY], // Actualiza la posición desde la API
          path: [], // Mantén el path vacío si no necesitas trazar rutas
        }))
      );
    } catch (error) {
      console.error('Error al actualizar los vehículos:', error);
    }
  };

  // Cargar datos iniciales y clientes
  useEffect(() => {
    if (scenario) {
      const initialClients = scenario.customers.map(customer => ({
        id: customer.id,
        position: [customer.coordX, customer.coordY], // Usa las coordenadas de los clientes
      }));
      setClients(initialClients);

      // Carga inicial de vehículos
      updateVehicles(scenario.id);
    }
  }, [scenario]);

  // Actualiza los vehículos cada cierto tiempo (intervalo)
  useEffect(() => {
    if (scenario) {
      const interval = setInterval(() => {
        updateVehicles(scenario.id);
      }, 1000); // Actualiza cada 5 segundos

      return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }
  }, [scenario]);

  const UpdateMap = () => {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize();
    }, [map]);
    return null;
  };

  return (
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
        <CarMarker key={car.id} position={car.position} id={car.id} taxiPath={car.path} />
      ))}
      {/* Renderiza los clientes */}
      {clients.map(client => (
        <ClientMarker key={client.id} position={client.position} id={client.id} />
      ))}
    </MapContainer>
  );
};

export default Map;




