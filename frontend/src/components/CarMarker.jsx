import React, { useState, useEffect } from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import taxiIconUrl from '../assets/taxi.png';
import { getTaxiPathColor } from '../utils/helpers'; // Función para obtener el color de la ruta

const CarMarker = ({ coordHistory, nextDestination, id }) => {
  const taxiName = `Taxi #${id.toString().substring(2, 6)}`; // Nombre del taxi basado en el ID
  const currentPosition = coordHistory[coordHistory.length-1];

  // Icono del taxi
  const icon = new L.Icon({
    iconUrl: taxiIconUrl, // URL del icono del taxi
    iconSize: [30, 30], // Tamaño del icono
  });

  console.log(coordHistory)
  console.log(nextDestination)

  const createPolylinePoints = (coords) => {
    const points = [];
    for (let i = 0; i < coords.length - 1; i++) {
      points.push([coords[i], coords[i + 1]]); // Añadimos pares consecutivos de coordenadas
    }
    return points;
  };

  // Generar las polylines de la ruta histórica
  const historicalPolylines = createPolylinePoints(coordHistory);

  return (
    <>
      {/* Dibuja la ruta histórica del taxi */}
      {(coordHistory && coordHistory.length > 1) &&       historicalPolylines.map((pair, index) => (
        <Polyline key={index} positions={pair} color="green" weight={4} />
      ))}
      
      {/* Si hay un destino actual, dibujamos la ruta hacia él */}
      {nextDestination && currentPosition && (
        <Polyline 
            positions={[currentPosition, nextDestination]} 
            color="gray" 
            weight={4} 
            dashArray="5,5" 
        />
        )}
      
      {/* Marcador del taxi */}
      <Marker position={currentPosition} icon={icon}>
        <Popup>{taxiName}</Popup>
      </Marker>
    </>
  );
};

export default CarMarker;



