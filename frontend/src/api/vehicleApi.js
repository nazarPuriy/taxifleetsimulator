// src/api/vehicleApi.js
import { API_BASE_URL } from '../config';

// Obtener todos los vehículos de un escenario
export const getVehicles = async (scenarioId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/scenarios/${scenarioId}/vehicles`);
    if (!response.ok) {
      throw new Error('Error al obtener los vehículos');
    }
    return await response.json(); // Devuelve la lista de vehículos
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Obtener un vehículo específico
export const getVehicle = async (vehicleId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`);
    if (!response.ok) {
      throw new Error('Error al obtener el vehículo');
    }
    return await response.json(); // Devuelve los datos del vehículo
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
