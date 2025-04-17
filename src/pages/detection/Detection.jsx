import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, User, LogOut } from 'lucide-react';
import logo from '../../assets/icon.png';
import DashboardFooter from '../../pages/Dashboard_Footer';

const Detection = () => {
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (!user) {
      navigate('/login');
    } else {
      setUsername(user);
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-green-700 text-gray-1000 flex flex-col justify-between">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 sm:px-6 py-3 flex justify-between items-center border-b border-green-200 relative">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Vitalis Logo"
            className="h-10 w-10 border-2 border-green-600 rounded-full p-1 transition-transform duration-300 hover:scale-110"
          />
          <span className="text-lg sm:text-xl font-semibold text-green-700">Vitalis</span>
        </div>
        <div className="flex items-center space-x-2 text-green-700 font-medium relative">
          <span className="hidden sm:inline">{username}</span>
          <button onClick={() => setShowDropdown(!showDropdown)}>
            <MoreVertical size={20} />
          </button>
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-12 mt-2 w-40 bg-white rounded-md shadow-lg border z-50"
            >
              <button
                onClick={handleProfile}
                className="flex items-center gap-2 px-4 py-2 w-full text-sm hover:bg-gray-100"
              >
                <User size={16} /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 w-full text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full text-center bg-white rounded-xl p-8 shadow-md">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">Leaf Detection</h1>
          <p className="text-gray-700 text-base sm:text-lg">
            This feature is under development. Soon, you'll be able to upload or capture images of plant leaves to detect potential diseases using AI-powered analysis.
          </p>
        </div>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default Detection;
