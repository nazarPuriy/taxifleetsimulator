import React, { useState } from 'react';
import {  deleteScenario } from '../api/scenarioApi'; // Importa las funciones para obtener y eliminar escenarios
import {  getScenario } from '../api/runnerApi'; // Importa las funciones para obtener y eliminar escenarios
import { getAllScenarios } from '../api/scenarioApi'; // Función para obtener todos los escenarios

const ControlPanel = ({ onCreateScenario, onDeleteScenario, scenario }) => {
  const [availableScenarios, setAvailableScenarios] = useState([]); // Lista de escenarios disponibles
  const [showScenarios, setShowScenarios] = useState(false); // Controla la visibilidad de la lista

  const handleCreateScenario = async (scenarioId) => {
    try {
      const fetchedScenario = await getScenario(scenarioId); // Obtiene el escenario con el ID
      onCreateScenario(fetchedScenario); // Pasa el escenario al MapPage
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
      onDeleteScenario(); // Notifica al MapPage para limpiar el estado del escenario
    } catch (error) {
      console.error("Error deleting scenario:", error);
    }
  };

  const handleFetchScenarios = async () => {
    try {
      const scenarios = await getAllScenarios(); // Obtiene todos los escenarios disponibles
      setAvailableScenarios(scenarios);
      setShowScenarios(true); // Muestra la lista de escenarios disponibles
    } catch (error) {
      console.error("Error fetching scenarios:", error);
    }
  };

  const handleSelectScenario = (selectedScenarioId) => {
    handleCreateScenario(selectedScenarioId); // Selecciona un escenario
    setShowScenarios(false); // Cierra la lista
  };

  return (
    <div className="mt-4 p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-4">Panel de Control</h3>

      {/* Botón para obtener el escenario */}
      <button
        onClick={() => handleCreateScenario(1)} // Aquí se podría cambiar a un ID dinámico
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

