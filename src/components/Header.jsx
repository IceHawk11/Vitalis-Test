import logo from '../assets/icon.png';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import i18n from '../i18n/i18n'; // ✅ import i18n to switch language globally

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLang = localStorage.getItem('vitalis-lang');
    if (savedLang) {
      setLanguage(savedLang);
      i18n.changeLanguage(savedLang); // ✅ sync with i18n
    }
  }, []);

  const handleSignupClick = () => {
    navigate('/signup');
    setIsOpen(false);
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem('vitalis-lang', selectedLang);
    i18n.changeLanguage(selectedLang); 
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
          <a href="#features" className="text-sm font-medium hover:text-primary">
            {language === 'hi' ? 'विशेषताएँ' : language === 'ta' ? 'அம்சங்கள்' : language === 'kn' ? 'ವೈಶಿಷ್ಟ್ಯಗಳು': 'Features'}
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary">
            {language === 'hi' ? 'हमारे बारे में' : language === 'ta' ? 'எங்களை பற்றி' : language==='kn' ? 'ನಮ್ಮ ಬಗ್ಗೆ': 'About'}
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-green-600 text-white text-base font-medium rounded-md px-4 py-2 hover:bg-green-500 cursor-pointer transition-colors"
          >
            <option value="en">🌐 English</option>
            <option value="hi">🌐 Hindi</option>
            <option value="ta">🌐 Tamil</option>
            <option value="kn">🌐 ಕನ್ನಡ</option> 
          </select>

          <Button onClick={handleSignupClick}>
            {language === 'hi'
              ? 'साइन अप करें'
              : language === 'ta'
              ? 'பதிவு செய்யவும்'
              : language==='kn'
              ? 'ನೋಂದಣಿ ಮಾಡಿ'
              : 'Sign up'}
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background p-6">
          <nav className="flex flex-col space-y-6">
            <a href="#features" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              {language === 'hi'
                ? 'विशेषताएँ'
                : language === 'ta'
                ? 'அம்சங்கள்'
                : language==='kn'
                ? 'ವೈಶಿಷ್ಟ್ಯಗಳು'
                : 'Features'}
                
            </a>
            <a href="#about" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              {language === 'hi'
                ? 'हमारे बारे में'
                : language === 'ta'
                ? 'எங்களை பற்றி'
                : language==='kn'
                ? 'ನಮ್ಮ ಬಗ್ಗೆ'
                : 'About'}
                
            </a>
            <div className="pt-6 flex flex-col gap-4">
              {/* Language Switcher in Mobile */}
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-green-500 text-white text-base font-medium rounded-md px-4 py-2 hover:bg-green-600 cursor-pointer transition-colors"
              >
                <option value="en">🌐 English</option>
                <option value="hi">🌐 हिन्दी</option>
                <option value="ta">🌐 தமிழ்</option>
                <option value="kn">🌐 ಕನ್ನಡ</option> 
              </select>

              <Button className="w-full" onClick={handleSignupClick}>
                {language === 'hi'
                  ? 'साइन अप करें'
                  : language === 'ta'
                  ? 'பதிவு செய்யவும்'
                  : 'Sign up'}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
