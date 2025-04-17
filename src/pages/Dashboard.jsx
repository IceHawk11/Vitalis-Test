import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Thermometer, Droplet, Wind, Sun, Gauge, Leaf, CloudRain, TrendingDown, Cloud,
  MoreVertical, User, LogOut
} from 'lucide-react';
import logo from '../assets/icon.png';
import DashboardFooter from './Dashboard_Footer';

const cities = [
  { name: 'Delhi', lat: 28.6667, lon: 77.2167 },
  { name: 'Mumbai', lat: 19.0144, lon: 72.8479 },
  { name: 'Bangalore', lat: 12.9762, lon: 77.6033 },
  { name: 'Kolkata', lat: 22.5697, lon: 88.3697 },
  { name: 'Chennai', lat: 13.0878, lon: 80.2785 }
];

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [soil, setSoil] = useState(null);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
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

    const fetchData = async () => {
      try {
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=173a27104f5eaba7e6b71f2b0057d82d&units=metric`
        );
        setWeather(weatherRes.data);

        const soilRes = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/agweather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&key=7910d509c8c9474ca1a8f64f9bd9153d`
        );
        const soilData = soilRes.data?.data?.[0];
        setSoil(soilData || null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCity, navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const getWeatherSummary = () => {
    if (!weather) return '';
    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const wind = weather.wind.speed;

    if (temp >= 20 && temp <= 30 && humidity <= 70 && wind < 15) {
      return {
        title: 'Mild & Pleasant',
        desc: 'Current conditions indicate a mild climate with moderate humidity and gentle winds, perfect for outdoor activities and plant growth.'
      };
    }
    return {
      title: 'Variable Conditions',
      desc: 'The weather conditions are changing. Please monitor regularly for optimal farming decisions.'
    };
  };

  const getSoilSummary = () => {
    if (!soil) return '';
    const moisture = soil.soilm_0_10cm;
    const evap = soil.evapotranspiration;
    const precip = soil.precip;

    if (moisture > 20 && evap < 6 && precip > 1) {
      return {
        title: 'Optimal Condition',
        desc: 'Soil moisture and nutrient levels are within the ideal range. The soil structure is well-maintained and suitable for healthy plant growth.'
      };
    }
    return {
      title: 'Needs Attention',
      desc: 'Soil health indicators suggest potential issues. Consider checking irrigation and nutrient supply.'
    };
  };

  const weatherSummary = getWeatherSummary();
  const soilSummary = getSoilSummary();

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
        {/* City Selector */}
        <div className="mb-6 flex justify-center">
          <select
            className="border px-4 py-2 rounded-md shadow-sm w-full sm:w-auto"
            value={selectedCity.name}
            onChange={(e) =>
              setSelectedCity(cities.find(city => city.name === e.target.value))
            }
          >
            {cities.map(city => (
              <option key={city.name} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>

        {/* Header Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Environmental Parameters</h2>
          <p className="text-base sm:text-lg text-white-800">
            Real-time monitoring of vital environmental conditions and soil parameters
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <InfoCard icon={<Thermometer />} label="Temperature" value={`${weather?.main.temp ?? '--'} °C`} />
          <InfoCard icon={<Droplet />} label="Humidity" value={`${weather?.main.humidity ?? '--'} %`} />
          <InfoCard icon={<Wind />} label="Wind Speed" value={`${weather?.wind.speed ?? '--'} m/s`} />
          <InfoCard icon={<Sun />} label="Condition" value={weather ? `${weather.main.temp} ${weather.weather[0].main}` : '--'} />
          <InfoCard icon={<Gauge />} label="Pressure" value={`${weather?.main.pressure ?? '--'} hPa`} />
          <InfoCard icon={<Leaf />} label="Soil Moisture" value={`${soil?.soilm_0_10cm ?? '--'} %`} />
          <InfoCard icon={<TrendingDown />} label="Evapotranspiration" value={`${soil?.evapotranspiration ?? '--'} mm/day`} />
          <InfoCard icon={<CloudRain />} label="Precipitation" value={`${soil?.precip ?? '--'} mm`} />
          <InfoCard icon={<Cloud />} label="Deep Percolation" value={
            soil?.precip && soil?.evapotranspiration
              ? `${(soil.precip - soil.evapotranspiration).toFixed(2)} mm/day`
              : '--'
          } />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <SummaryCard
            title="Weather Analysis"
            highlight={weatherSummary.title}
            description={weatherSummary.desc}
            icon="🌤️"
          />
          <SummaryCard
            title="Soil Health Status"
            highlight={soilSummary.title}
            description={soilSummary.desc}
            icon="🧪"
          />
        </div>

        {/* Leaf Detection Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate('/detection/detection')}
            className="bg-white text-green-800 font-serif font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-green-300 hover:bg-green-100"
          >
            Leaf Detection
          </button>
        </div>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

// InfoCard Component
const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md flex flex-col gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-green-300 hover:bg-green-100">
    <div className="flex items-center gap-3 text-green-600 text-base sm:text-lg font-semibold">
      {icon}
      <span>{label}</span>
    </div>
    <p className="text-lg sm:text-xl font-bold">{value}</p>
  </div>
);

// SummaryCard Component
const SummaryCard = ({ title, highlight, description, icon }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-green-300 hover:bg-green-100">
    <div className="flex items-center gap-3 sm:gap-4 mb-2 text-base sm:text-xl font-semibold">
      <span className="text-2xl sm:text-3xl">{icon}</span>
      {title}
    </div>
    <p className="text-green-700 font-bold text-base sm:text-lg">{highlight}</p>
    <p className="text-sm text-gray-700 mt-2">{description}</p>
  </div>
);

export default Dashboard;
