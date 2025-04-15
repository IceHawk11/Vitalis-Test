import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/icon.png'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const credentials = [
    { username: 'IceHawk', password: 'icehawk#4' },
    { username: 'Rimi', password: 'sd280604' },
    { username: 'Yash', password: 'yashch#3136' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const validUser = credentials.find(
      (user) => user.username === username && user.password === password
    );
    if (validUser) {
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e1d12] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-[#112e1a] p-8 rounded-xl shadow-lg space-y-6"
      >
        {/* ✅ Logo with framer hover + click to home */}
        <div className="flex justify-center mb-2">
          <motion.img
            src={logo}
            alt="Vitalis Logo"
            className="h-12 w-12 rounded-full border border-green-500 shadow-md cursor-pointer"
            whileHover={{
              scale: 1.15,
              boxShadow: '0 0 12px rgba(34,197,94,0.7)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => navigate('/')}
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-green-400">Welcome Back</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-green-300">Username</label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-10 py-2 border border-green-700 rounded-md bg-transparent text-green-100 placeholder:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Username"
              required
            />
            <Mail className="absolute left-3 top-2.5 text-green-500" size={18} />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-green-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-2 border border-green-700 rounded-md bg-transparent text-green-100 placeholder:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Password"
              required
            />
            <Lock className="absolute left-3 top-2.5 text-green-500" size={18} />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-green-500 hover:text-green-400"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="text-sm text-green-400 text-right mb-2 cursor-pointer hover:underline">
          Forgot password?
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 rounded-md transition"
        >
          Login
        </button>

        <div className="text-sm text-center text-green-300 mt-4">
          Don’t have an account?{' '}
          <span className="text-green-400 font-medium hover:underline cursor-pointer">
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
