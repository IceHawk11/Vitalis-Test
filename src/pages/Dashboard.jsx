import logo from '../assets/icon.png';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import axios from 'axios';

const cities = [
  { name: 'Delhi', lat: 28.6667, lon: 77.2167 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707 }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [soil, setSoil] = useState(null);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchWeatherAndSoilData = async () => {
      try {
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=173a27104f5eaba7e6b71f2b0057d82d&units=metric`
        );
        setWeather(weatherRes.data);

        const soilRes = await axios.get(
          `https://api.weatherbit.io/v2.0/current/agweather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&key=7910d509c8c9474ca1a8f64f9bd9153d`
        );
        setSoil(soilRes.data.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchWeatherAndSoilData();
  }, [selectedCity]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 text-white flex flex-col">
      <header className="flex justify-between items-center p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Vitalis Logo" className="h-10 w-10 object-cover rounded-full" />
          <h1 className="text-2xl font-bold">Vitalis Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Welcome, {username}</span>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center gap-12 px-4">
        <div className="mb-8">
          <label htmlFor="city" className="mr-2">Select City:</label>
          <select
            id="city"
            className="p-2 rounded-md text-black"
            value={selectedCity.name}
            onChange={(e) => {
              const city = cities.find(c => c.name === e.target.value);
              setSelectedCity(city);
            }}
          >
            {cities.map(city => (
              <option key={city.name} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left">
          {/* Weather Parameters */}
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Temperature</h2>
            <p>{weather ? `${weather.main.temp} °C` : 'Loading...'}</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Humidity</h2>
            <p>{weather ? `${weather.main.humidity} %` : 'Loading...'}</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Wind Speed</h2>
            <p>{weather ? `${weather.wind.speed} m/s` : 'Loading...'}</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Condition</h2>
            <p>{weather ? weather.weather[0].description : 'Loading...'}</p>
          </div>

          {/* Soil Parameters */}
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Soil Moisture</h2>
            <p>{soil ? `${soil.soil_moisture} mm` : 'Loading...'}</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Evapotranspiration</h2>
            <p>{soil ? `${soil.evapotranspiration} mm` : 'Loading...'}</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Precipitation</h2>
            <p>{soil ? `${soil.precip} mm` : 'Loading...'}</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Deep Percolation</h2>
            <p>{soil ? `${soil.dl} mm` : 'Loading...'}</p>
          </div>
        </div>

        <div className="flex gap-8 mt-12">
          <Button size="lg" className="px-10 text-lg">Soil Health</Button>
          <Button size="lg" className="px-10 text-lg">Plant Disease Detection</Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
