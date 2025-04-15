import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Login from './login/Login';
import Dashboard from './pages/Dashboard';
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
        <Route path="/login" element={<PageTransitionWrapper><Login /></PageTransitionWrapper>} />
        <Route path="/dashboard" element={<PageTransitionWrapper><Dashboard /></PageTransitionWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;
