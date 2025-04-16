// src/login/Username.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png';

const Username = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      if (username === 'user123') {
        localStorage.setItem('username', username);
        navigate('/login/passwd');
      } else {
        alert('Invalid username');
      }
    } else if (mobile.trim()) {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (mobileRegex.test(mobile)) {
        localStorage.setItem('mobile', mobile);
        navigate('/login/otp');
      } else {
        alert('Enter a valid 10-digit mobile number');
      }
    } else {
      alert('Please enter either Username or Mobile Number');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          {/* Clickable logo */}
          <img
            src={logo}
            alt="Vitalis Logo"
            onClick={() => navigate('/')}
            className="w-14 h-14 rounded-full border-2 border-green-500 mb-2 cursor-pointer transition-transform hover:scale-110"
          />
          <h2 className="text-2xl font-bold text-green-700">Welcome Back</h2>
          <p className="text-sm text-gray-600 mt-1 text-center">
            Login with either Username or Mobile Number
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="text-center font-medium text-gray-500">OR</div>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
          >
            Next
          </button>
        </form>

        {/* Sign Up link */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Create New Account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Username;
