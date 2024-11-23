import React, { useState } from 'react';
import { getScenario, deleteScenario } from '../api/scenarioApi'; // Mantén getScenario para cargar un escenario individual
import { getAllScenarios } from '../api/scenarioApi'; // Importa getAllScenarios para obtener todos los escenarios

const ControlPanel = ({ onCreateScenario, onDeleteScenario }) => {
  const [scenario, setScenario] = useState(null);
  const [availableScenarios, setAvailableScenarios] = useState([]); // Lista de escenarios disponibles
  const [showScenarios, setShowScenarios] = useState(false); // Controla la visibilidad de la lista

  const handleCreateScenario = async (scenarioId) => {
    try {
      const fetchedScenario = await getScenario(scenarioId); // Llama a getScenario con el ID
      setScenario(fetchedScenario);
      onCreateScenario(fetchedScenario); // Actualiza el estado en MapPage
    } catch (error) {
      console.error("Error fetching scenario:", error);
    }
  };

  const handleDeleteScenario = async () => {
    if (!scenario) {
      alert("No scenario to delete.");
      return;
    }

    try {
      await deleteScenario(scenario.id);
      onDeleteScenario(); // Limpia el estado en MapPage
      setScenario(null);
    } catch (error) {
      console.error("Error deleting scenario:", error);
    }
  };

  const handleFetchScenarios = async () => {
    try {
      const scenarios = await getAllScenarios(); // Llama a la función para obtener todos los escenarios
      setAvailableScenarios(scenarios); // Guarda los escenarios en el estado
      setShowScenarios(true); // Muestra la lista de escenarios
    } catch (error) {
      console.error("Error fetching scenarios:", error);
    }
  };

  const handleSelectScenario = (selectedScenarioId) => {
    handleCreateScenario(selectedScenarioId); // Actualiza el ID seleccionado en MapPage
    setShowScenarios(false); // Cierra la lista
  };

  return (
    <div className="mt-4 p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-4">Panel de Control</h3>

      {/* Botón para obtener el escenario */}
      <button
        onClick={handleCreateScenario}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Obtener Escenario
      </button>

      {/* Botón para detener la simulación */}
      <div className="mt-4">
        <button
          onClick={handleDeleteScenario}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Detener Simulación
        </button>
      </div>

      {/* Botón para ver los escenarios disponibles */}
      <div className="mt-4">
        <button
          onClick={handleFetchScenarios}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Ver Escenarios Disponibles
        </button>
      </div>

      {/* Lista de escenarios disponibles */}
      {showScenarios && (
        <div className="mt-4">
          <h4 className="font-semibold">Escenarios Disponibles:</h4>
          <ul className="list-disc pl-5">
            {availableScenarios.map((scenario) => (
              <li key={scenario.id}>
                ID: {scenario.id} - {scenario.name}
                <button
                  onClick={() => handleSelectScenario(scenario.id)}
                  className="ml-2 px-2 py-1 bg-blue-400 text-white rounded hover:bg-blue-500"
                >
                  Seleccionar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;

