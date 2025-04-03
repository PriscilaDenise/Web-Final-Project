import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainDashboard from './dashboard';
import LoginPage from './login';
import Dashboard from './manager';
import BabysitterPortal from './babysitter-portal';
import BabysitterManagement from './babysitter-mgt';
import ChildManagement from './child-mgt';
import FinancialManagement from './financial-mgt';
import Notifications from './notifications';
import ReportsAndAnalytics from './report';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainDashboard />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/babysitter-portal" element={<BabysitterPortal />} />
        <Route path="/babysitter-management" element={<BabysitterManagement />} />
        <Route path="/child-management" element={<ChildManagement />} />
        <Route path="/financials" element={<FinancialManagement />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/reports" element={<ReportsAndAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;


