// src/login/Passwd.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png';
import { Eye, EyeOff } from 'lucide-react';

const Passwd = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validPasswords = ['sd280604', 'yashch#3136', 'icehawk#4'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validPasswords.includes(password)) {
      navigate('/dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Vitalis Logo"
            onClick={() => navigate('/')}
            className="w-14 h-14 rounded-full border-2 border-green-500 mb-2 cursor-pointer transition-transform hover:scale-110"
          />
          <h2 className="text-2xl font-bold text-green-700">Enter Password</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-green-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

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
