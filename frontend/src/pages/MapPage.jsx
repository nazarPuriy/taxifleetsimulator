import React, { useState } from 'react';
import Map from '../components/Map';
import ControlPanel from '../components/ControlPanel';

const MapPage = () => {
  const [scenario, setScenario] = useState(null);

  const handleCreateScenario = (newScenario) => {
    setScenario(newScenario);  // Actualiza el estado con el nuevo escenario
  };

  const handleDeleteScenario = () => {
    setScenario(null);  
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mt-4">Mapa de Taxis</h1>

      {/* Pasamos setScenarioId como prop al ControlPanel */}
      <ControlPanel
        onCreateScenario={handleCreateScenario}
        onDeleteScenario={handleDeleteScenario}
      />

      <h1>{scenario ? scenario.id : "No scenario available"}</h1>

      <Map scenario={scenario} />
    </div>
  );
};

export default MapPage;
