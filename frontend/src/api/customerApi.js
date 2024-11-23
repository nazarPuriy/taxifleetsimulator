// src/api/customerApi.js
import { API_BASE_URL } from '../config';

// Obtener todos los clientes para un escenario
export const getCustomers = async (scenarioId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/scenarios/${scenarioId}/customers`);
    if (!response.ok) {
      throw new Error('Error al obtener los clientes');
    }
    return await response.json(); // Devuelve la lista de clientes
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Obtener un cliente específico
export const getCustomer = async (customerId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${customerId}`);
    if (!response.ok) {
      throw new Error('Error al obtener el cliente');
    }
    return await response.json(); // Devuelve los datos del cliente
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
