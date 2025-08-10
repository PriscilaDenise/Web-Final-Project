import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import EnrollForm from './pages/EnrollForm';
import ScheduleTour from './pages/ScheduleTour';
import ParentDashboard from './pages/ParentDashboard';
import BabysitterDashboard from './pages/BabysitterDashboard';
import ManagerDashboard from './pages/ManagerDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/enroll" element={<EnrollForm />} />
              <Route path="/schedule-tour" element={<ScheduleTour />} />
              <Route
                path="/parent-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <ParentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/babysitter-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['babysitter']}>
                    <BabysitterDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manager-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['manager']}>
                    <ManagerDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 