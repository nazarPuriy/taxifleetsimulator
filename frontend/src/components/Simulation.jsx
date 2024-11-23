import { useEffect, useState } from 'react';
import { getScenario } from '../api/runnerApi';

const Simulation = ({ scenario, onSimulationUpdate, onSimulationEnd }) => {

  useEffect(() => {
    // Si no hay escenario, no hacer nada
    if (!scenario) return;

    const updateData = async () => {
      try {
        const updatedScenario = await getScenario(scenario.id);
        // Pasa los datos actualizados al MapPage
        // **Nuevo paso**: Actualizamos la posición de los vehículos usando el customerId
        const vehiclesWithUpdatedPositions = updatedScenario.vehicles.map(vehicle => {
            // Buscar el cliente correspondiente por customerId
            const customer = updatedScenario.customers.find(customer => customer.id === vehicle.customerId);
            
            // Si el cliente es encontrado, actualizar la posición del vehículo
            if (customer) {
              vehicle.customerCoordX = customer.coordX;
              vehicle.customerCoordY = customer.coordY;
            } else {
                vehicle.customerCoordX = vehicle.coordX;
                vehicle.customerCoordY = vehicle.coordY;
            }
  
            return vehicle;
        });
  
          // Pasamos los vehículos con posiciones actualizadas y el resto del escenario al MapPage
        onSimulationUpdate({
            ...updatedScenario,
            vehicles: vehiclesWithUpdatedPositions,
        });

        console.log(vehiclesWithUpdatedPositions)

        // Comprobar si todos los clientes han sido atendidos
        const remainingClients = updatedScenario.customers.filter(client => client.awaitingService).length;
        if (remainingClients === 0) {
          onSimulationEnd();  // Si no hay más clientes esperando, se termina la simulación
        }
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
