import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Шетпе-Актау
          </Link>
          <div className="flex gap-4">
            <Link to="/driver" className="hover:text-blue-600">Водителям</Link>
            <Link to="/booking" className="hover:text-blue-600">Пассажирам</Link>
            <Link to="/help" className="hover:text-blue-600">Помощь</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
