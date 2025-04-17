import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Detection from './pages/detection/Detection';
import Username from './login/Username';
import Passwd from './login/Passwd';
import Dashboard from './pages/Dashboard';
import Signup from './signup/Signup'; // ✅ Import the Signup component
import PageTransitionWrapper from './components/PageTransitionWrapper';

function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageTransitionWrapper><Home /></PageTransitionWrapper>} />
        <Route path="/login/username" element={<PageTransitionWrapper><Username /></PageTransitionWrapper>} />
        <Route path="/login/passwd" element={<PageTransitionWrapper><Passwd /></PageTransitionWrapper>} />
        <Route path="/detection/detection" element={<Detection />} />
        <Route path="/signup" element={<PageTransitionWrapper><Signup /></PageTransitionWrapper>} /> 
        <Route path="/dashboard" element={<PageTransitionWrapper><Dashboard /></PageTransitionWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;
