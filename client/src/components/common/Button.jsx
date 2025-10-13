import React from 'react';

const Button = ({ children, variant = 'primary', onClick, disabled, className = '' }) => {
  const baseClasses = 'py-3 px-6 rounded-lg font-semibold transition-colors duration-200';
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
