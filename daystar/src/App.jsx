// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import LandingPage from './pages/LandingPage';
import EnrollPage from './pages/EnrollPage';
import ScheduleTourPage from './pages/ScheduleTourPage';
import LoginPage from './pages/LoginPage';
import ParentDashboard from './pages/ParentDashboard';
import BabysitterDashboard from './pages/BabysitterDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProgramsPage from './pages/ProgramsPage';
import "./App.css"

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/enroll" element={<EnrollPage />} />
          <Route path="/schedule-tour" element={<ScheduleTourPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/babysitter-dashboard" element={<BabysitterDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;