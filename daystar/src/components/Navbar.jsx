// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn = false, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold text-blue-500">Daystar Daycare</Link>
        </div>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
          <li><Link to="/programs" className="hover:text-blue-500">Programs</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
          {!isLoggedIn ? (
            <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;