// src/api/scenarioApi.js
import { API_RUNNER_URL } from '../config';

// Obtener un escenario específico
export const getScenario = async (scenarioId) => {
  try {
    const response = await fetch(`${API_RUNNER_URL}/Scenarios/get_scenario/${scenarioId}`);
    if (!response.ok) {
      throw new Error('Error al obtener el escenario');
    }
    return await response.json(); // Devuelve los datos del escenario
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Crear un nuevo escenario
export const initializeScenario = async (scenarioData) => {
    try {
      const response = await fetch(`${API_RUNNER_URL}/Scenarios/initialize_scenario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Especifica que el cuerpo está en formato JSON
        },
        body: JSON.stringify(scenarioData), // Convierte el objeto del escenario a JSON
      });
  
      if (!response.ok) {
        throw new Error('Error al inicializar el escenario');
      }
  
      return await response.json(); // Devuelve la respuesta del servidor
    } catch (error) {
      console.error('Error al inicializar el escenario:', error);
      return null; // O lanza el error según lo necesites
    }
  };


  export const launchScenario = async (scenarioId, speed = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Runner/launch_scenario/${scenarioId}?speed=${speed}`, {
        method: 'POST',
      });
  
      if (!response.ok) {
        throw new Error(`Error al lanzar el escenario con ID ${scenarioId} y velocidad ${speed}`);
      }
  
      return await response.json(); // Devuelve la respuesta del servidor
    } catch (error) {
      console.error('Error al lanzar el escenario:', error);
      return null; // O lanza el error según lo necesites
    }
  };