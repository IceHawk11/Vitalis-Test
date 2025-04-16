import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import dashboardPreview from '../assets/Dashboard/front_icon.jpg'; 

const HeroSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text Content */}
        <div className="max-w-xl">
          <span className="text-sm text-green-600 font-semibold uppercase tracking-wide">
            Launching Soon
          </span>
          <h1 className="text-4xl md:text-5xl font-bold my-4">
            Vitality for the <span className="text-green-600">Digital Age</span>
          </h1>
          <p className="text-gray-700 mb-6">
            Pioneering a new era in agriculture through breakthrough technology—ushering in seamless, AI-driven plant disease detection and intelligent monitoring at unprecedented scale, empowering farmers worldwide to cultivate healthier crops, maximize yields, and redefine the future of sustainable farming.
          </p>
          <div className="flex gap-4">
            <Link to="/login/username">
              <Button size="lg">Login</Button>
            </Link>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-shrink-0">
          <img
            src={dashboardPreview}
            alt="Vitalis Dashboard"
            className="rounded-xl shadow-xl w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
