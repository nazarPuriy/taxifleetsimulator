import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tus estilos globales
import 'leaflet/dist/leaflet.css'; // Estilos de Leaflet
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);