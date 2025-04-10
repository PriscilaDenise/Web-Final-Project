// src/components/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ text, to, primary = false }) => {
  return (
    <Link
      to={to}
      className={`inline-block px-6 py-3 rounded-lg font-semibold ${
        primary ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-white text-blue-500 hover:bg-gray-100'
      }`}
    >
      {text}
    </Link>
  );
};

export default Button;