// src/api/scenarioApi.js
import { API_BASE_URL } from '../config';

// Obtener un escenario específico
export const getScenario = async (scenarioId) => {
  try {
    console.log(scenarioId)
    const response = await fetch(`${API_BASE_URL}/scenarios/${scenarioId}`);
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
export const createScenario = async (scenarioData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/scenario/create`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
      },
      body: JSON.stringify(scenarioData),
    });
    if (!response.ok) {
      throw new Error('Error al crear el escenario');
    }
    return await response.json(); // Devuelve los datos del nuevo escenario
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Obtener todos los escenarios
export const getAllScenarios = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/scenarios`);
    if (!response.ok) {
      throw new Error('Error al obtener los escenarios');
    }
    return await response.json(); // Devuelve todos los escenarios
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Eliminar un escenario
export const deleteScenario = async (scenarioId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/scenarios/${scenarioId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el escenario');
    }
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};
