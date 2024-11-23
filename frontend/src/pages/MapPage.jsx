import React, { useState } from 'react';
import Map from '../components/Map';
import ControlPanel from '../components/ControlPanel';
import Simulation from '../components/Simulation';

const MapPage = () => {
  const [scenario, setScenario] = useState(null);
  const [simulationData, setSimulationData] = useState({ cars: [], clients: [] });
  const [isSimulationFinished, setIsSimulationFinished] = useState(false);

  const handleCreateScenario = (newScenario) => {
    setScenario(newScenario);  // Actualiza el estado con el nuevo escenario
    setIsSimulationFinished(false); // Resetear el estado de la simulación
  };

  const handleDeleteScenario = () => {
    setScenario(null);  
    setIsSimulationFinished(false); // Resetear el estado de la simulación
  };

  const handleSimulationUpdate = (updatedScenario) => {
    setScenario(updatedScenario)
    setSimulationData({
      cars: updatedScenario.vehicles,
      clients: updatedScenario.customers
    });
  };

  const handleSimulationEnd = () => {
    setIsSimulationFinished(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mt-4">Mapa de Taxis</h1>

      {/* Panel de control */}
      <ControlPanel
        onCreateScenario={handleCreateScenario}
        onDeleteScenario={handleDeleteScenario}
        scenario={scenario}
      />

      <h1>{scenario ? scenario.id : "No scenario available"}</h1>

      {/* Simulación */}
      {scenario && (
        <Simulation
          scenario={scenario}
          onSimulationUpdate={handleSimulationUpdate}
          onSimulationEnd={handleSimulationEnd}
        />
      )}

      {/* Mapa */}
      <Map 
        cars={simulationData.cars} 
        clients={simulationData.clients} 
        isSimulationFinished={isSimulationFinished}
      />
    </div>
  );
};

export default MapPage;
