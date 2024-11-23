import { useEffect, useState } from 'react';
import { getScenario } from '../api/runnerApi';

const Simulation = ({ scenario, onSimulationUpdate, onSimulationEnd }) => {

  useEffect(() => {
    // Si no hay escenario, no hacer nada
    if (!scenario) return;

    const updateData = async () => {
        try {
          // Obtener el escenario actualizado
          const updatedScenario = await getScenario(scenario.id);
      
          // Obtener los vehículos con posiciones actualizadas
          const vehiclesWithUpdatedPositions = updatedScenario.vehicles.map(vehicle => {
            // Buscar el cliente correspondiente por customerId
            const customer = updatedScenario.customers.find(customer => customer.id === vehicle.customerId);
      
            // Si el vehículo tiene un historial de coordenadas, lo obtenemos del escenario anterior
            const previousVehicle = scenario ? scenario.vehicles.find(v => v.id === vehicle.id) : null;
            
            // Inicializamos coordHistory si no existe o si el vehículo no tiene historial en el escenario anterior
            if (!previousVehicle.coordHistory) {
              vehicle.coordHistory = [];
            } else {
                vehicle.coordHistory = previousVehicle.coordHistory
            }
      
            // Comprobamos si la nueva posición del vehículo es distinta a la última posición en coordHistory
            const newPosition = [vehicle.coordX, vehicle.coordY];
            const lastPosition = vehicle.coordHistory[vehicle.coordHistory.length - 1];
      
            // Si la nueva posición es diferente a la última registrada, la añadimos al historial
            if (!lastPosition || lastPosition[0] !== newPosition[0] || lastPosition[1] !== newPosition[1]) {
              vehicle.coordHistory.push(newPosition);
            }
      
            // Ahora actualizamos el destino del vehículo según la posición del cliente
            if (customer) {
              if (vehicle.coordX === customer.coordX && vehicle.coordY === customer.coordY) {
                // Si el vehículo ha llegado al cliente, se establece el destino como el destino final
                vehicle.nextDestination = [customer.destinationX, customer.destinationY];
              } else {
                // Si el vehículo está yendo al cliente, se establece la posición del cliente como el próximo destino
                vehicle.nextDestination = [customer.coordX, customer.coordY];
              }
            } else {
              // Si no hay cliente, no hay destino
              vehicle.nextDestination = null;
            }
      
            return vehicle;
          });
          console.log(vehiclesWithUpdatedPositions)
          // Pasamos los vehículos actualizados (con coordenadas y destinos) al MapPage
          onSimulationUpdate({
            ...updatedScenario,
            vehicles: vehiclesWithUpdatedPositions,
          });
      
        } catch (error) {
          console.error("Error al actualizar los datos del escenario:", error);
        }
      };
      

    // Actualizar cada segundo
    const interval = setInterval(updateData, 1000);

    // Limpiar intervalo al desmontar
    return () => clearInterval(interval);
  }, [scenario, onSimulationUpdate, onSimulationEnd]);

  return null; // Este componente no renderiza nada
};

export default Simulation;
