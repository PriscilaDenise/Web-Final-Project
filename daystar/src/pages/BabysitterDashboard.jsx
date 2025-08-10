// src/pages/BabysitterDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Notifications from '../components/Notification';
import { useNotifications } from '../context/NotificationContext';
import { babysitters, schedules, incidents, operations } from '../api';

const BabysitterDashboard = () => {
  const navigate = useNavigate();
  const { notifications, addNotification } = useNotifications();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    nin: '',
  });

  const [schedulesList, setSchedulesList] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [password, setPassword] = useState('');
  const [incidentReport, setIncidentReport] = useState({ childName: '', description: '' });
  const [dailyReport, setDailyReport] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, schedulesRes] = await Promise.all([
          babysitters.getProfile(),
          schedules.getAll()
        ]);
        
        setProfile(profileRes.data);
        setSchedulesList(schedulesRes.data);
      } catch (error) {
        addNotification('Failed to fetch data. Please try again.', 'error', 'babysitter');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addNotification]);

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const savePassword = async () => {
    if (password.length < 6) {
      addNotification('Password must be at least 6 characters long.', 'error', 'babysitter');
      return;
    }

    try {
      setLoading(true);
      await operations.updatePassword(password);
      addNotification('Password changed successfully!', 'success', 'babysitter');
      setPassword('');
    } catch (error) {
      addNotification('Failed to change password. Please try again.', 'error', 'babysitter');
    } finally {
      setLoading(false);
    }
  };

  // Handle incident report
  const handleIncidentChange = (e) => {
    const { name, value } = e.target;
    setIncidentReport((prev) => ({ ...prev, [name]: value }));
  };

  const submitIncident = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await incidents.create(incidentReport);
      addNotification('Incident report submitted successfully!', 'success', 'babysitter');
      setIncidentReport({ childName: '', description: '' });
    } catch (error) {
      addNotification('Failed to submit incident report. Please try again.', 'error', 'babysitter');
    } finally {
      setLoading(false);
    }
  };

  // Handle daily report
  const handleDailyReportChange = (e) => {
    setDailyReport(e.target.value);
  };

  const submitDailyReport = async () => {
    try {
      setLoading(true);
      await operations.submitDailyReport(dailyReport);
      addNotification('Daily report submitted successfully!', 'success', 'babysitter');
      setDailyReport('');
    } catch (error) {
      addNotification('Failed to submit daily report. Please try again.', 'error', 'babysitter');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Babysitter Dashboard</h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('schedules')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'schedules' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Schedules
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'attendance' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Attendance
          </button>
          <button
            onClick={() => setActiveTab('incidents')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'incidents' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Report Incident
          </button>
          <button
            onClick={() => setActiveTab('dailyReport')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'dailyReport' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Daily Report
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'password' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Change Password
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
            <p><strong>First Name:</strong> {profile.firstName}</p>
            <p><strong>Last Name:</strong> {profile.lastName}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>National ID:</strong> {profile.nin}</p>
          </div>
        )}

        {activeTab === 'schedules' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your Schedules</h2>
            {schedulesList.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Date</th>
                    <th className="p-2">Time</th>
                    <th className="p-2">Children Assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {schedulesList.map((schedule) => (
                    <tr key={schedule.id} className="border-b">
                      <td className="p-2">{schedule.date}</td>
                      <td className="p-2">{schedule.time}</td>
                      <td className="p-2">{schedule.children.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No schedules assigned.</p>
            )}
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Child Attendance</h2>
            {attendanceList.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Child Name</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Session</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceList.map((record) => (
                    <tr key={record.id} className="border-b">
                      <td className="p-2">{record.childName}</td>
                      <td className="p-2">{record.date}</td>
                      <td className="p-2">{record.status}</td>
                      <td className="p-2">{record.session}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No attendance records available.</p>
            )}
          </div>
        )}

        {activeTab === 'incidents' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Report an Incident</h2>
            <form onSubmit={submitIncident} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Child's Name</label>
                <input
                  type="text"
                  name="childName"
                  value={incidentReport.childName}
                  onChange={handleIncidentChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Incident Description</label>
                <textarea
                  name="description"
                  value={incidentReport.description}
                  onChange={handleIncidentChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Describe the incident..."
                  rows="4"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit Incident Report
              </button>
            </form>
          </div>
        )}

        {activeTab === 'dailyReport' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Daily Report</h2>
            <textarea
              value={dailyReport}
              onChange={handleDailyReportChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Write your daily report here..."
              rows="6"
            />
            <button
              onClick={submitDailyReport}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit Daily Report
            </button>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
              </div>
              <button
                onClick={savePassword}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Change Password
              </button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default BabysitterDashboard;