// src/login/Passwd.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png';

const Passwd = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual password validation
    if (password === 'Test@123') {
      navigate('/dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Vitalis Logo"
            className="w-14 h-14 rounded-full border-2 border-green-500 mb-2 transition-transform hover:scale-110"
          />
          <h2 className="text-2xl font-bold text-green-700">Enter Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Passwd;
