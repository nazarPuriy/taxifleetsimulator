import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/MapPage';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Encabezado con fondo degradado */}
      <header className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black py-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Título */}
          <h1 className="text-5xl font-extrabold tracking-wide flex items-center space-x-3">
            <span role="img" aria-label="Taxi">🚕</span>
            <span>TaxiFleetSimulator</span>
          </h1>

          {/* Menú de navegación */}
          <nav className="flex space-x-8">
            <Link
              to="/"
              className="text-xl font-medium hover:text-yellow-900 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/map-page"
              className="text-xl font-medium hover:text-yellow-900 transition duration-300"
            >
              MapPage
            </Link>
          </nav>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-grow p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map-page" element={<MapPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-yellow-900 text-white text-center py-4">
        <p className="text-sm">© 2024 TaxiFleetSimulator. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
