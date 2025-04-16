import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    role: '',
    username: '',
    mobile: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);

    return hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(form.mobile)) {
      setError('Mobile number must be 10 digits.');
      return;
    }

    if (!validatePassword(form.password)) {
      setError(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    console.log('User signed up:', form);
    localStorage.setItem('username', form.username);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <motion.img
            src={logo}
            alt="Vitalis Logo"
            className="w-14 h-14 rounded-full border-2 border-green-500 mb-2 cursor-pointer"
            whileHover={{
              scale: 1.1,
              boxShadow: '0 0 12px rgba(34,197,94,0.6)',
            }}
            onClick={() => navigate('/')}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <h2 className="text-2xl font-bold text-green-700">Sign Up</h2>
          <p className="text-sm text-gray-600 mt-1 text-center">Create your Vitalis account</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="role" className="text-sm mb-1 block text-green-700">Role</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-green-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select your role</option>
              <option value="cultivator">Cultivator</option>
              <option value="agronomist">Agronomist</option>
              <option value="homesteader">Homesteader</option>
            </select>
          </div>

          <div>
            <label htmlFor="username" className="text-sm mb-1 block text-green-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="text-sm mb-1 block text-green-700">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              maxLength="10"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
          </div>

          <div>
            <label htmlFor="password" className="text-sm mb-1 block text-green-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md">
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-700">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login/username')}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
