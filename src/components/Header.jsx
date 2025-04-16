import logo from '../assets/icon.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
    setIsOpen(false); // close menu if mobile
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <motion.img
            src={logo}
            alt="Vitalis Logo"
            whileHover={{
              scale: 1.1,
              boxShadow: '0 0 15px rgba(34,197,94,0.6)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-10 h-10 rounded-full border-2 border-green-500"
          />
          <span className="text-lg font-bold">Vitalis</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-primary">Features</a>
          <a href="#about" className="text-sm font-medium hover:text-primary">About</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button onClick={handleSignupClick}>Sign up</Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background p-6">
          <nav className="flex flex-col space-y-6">
            <a href="#features" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#about" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>About</a>
            <div className="pt-6 flex flex-col gap-4">
              <Button className="w-full" onClick={handleSignupClick}>Sign up</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
