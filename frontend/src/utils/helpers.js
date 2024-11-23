// Función para generar posiciones aleatorias alrededor de un centro (para simulación de movimiento)
export const generateRandomPosition = (center) => {
    const latOffset = (Math.random() - 0.5) * 0.02;  // Desplazamiento aleatorio de hasta 0.02 grados
    const lngOffset = (Math.random() - 0.5) * 0.02;
    return [center[0] + latOffset, center[1] + lngOffset];
  };
  
  // Función para generar ubicaciones realistas para los taxis
  export const generateRealisticTaxiPosition = (center) => {
    // Aquí puedes modificar la lógica para generar posiciones en áreas relevantes, por ejemplo, zonas de tráfico
    const latOffset = (Math.random() - 0.5) * 0.005;  // Menor desplazamiento para hacerlo más realista
    const lngOffset = (Math.random() - 0.5) * 0.005;
    return [center[0] + latOffset, center[1] + lngOffset];
  };
  

  export const getTaxiPathColor = (id) => {
    const colors = ['blue', 'red', 'green', 'orange', 'purple']; // Array of colors
    // Use modulo to cycle through the colors array based on the taxi's id
    const colorIndex = Math.floor(id % colors.length); 
    return colors[colorIndex]; // Return the color
  };

  export const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
  