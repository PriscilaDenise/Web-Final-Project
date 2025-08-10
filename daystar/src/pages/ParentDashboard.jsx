// src/pages/ParentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Notifications from '../components/Notification';
import { useNotifications } from '../context/NotificationContext';
import { parentPayments, operations } from '../api';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { notifications, addNotification } = useNotifications();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [profile, setProfile] = useState({
    parentName: '',
    email: '',
    phone: '',
  });
  const [children, setChildren] = useState([]);
  const [password, setPassword] = useState('');
  const [newChild, setNewChild] = useState({ name: '', age: '', specialNeeds: '', sessionType: 'half-day' });
  const [editingChild, setEditingChild] = useState(null);
  const [activeTab, setActiveTab] = useState('notifications');

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [paymentsRes, profileRes] = await Promise.all([
          parentPayments.getAll(),
          operations.getProfile()
        ]);
        
        setPaymentHistory(paymentsRes.data);
        setProfile(profileRes.data);
      } catch (error) {
        addNotification('Failed to fetch data. Please try again.', 'error', 'parent');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addNotification]);

  // Handle profile update
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      await operations.updateProfile(profile);
      addNotification('Profile updated successfully!', 'success', 'parent');
    } catch (error) {
      addNotification('Failed to update profile. Please try again.', 'error', 'parent');
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const savePassword = async () => {
    if (password.length < 6) {
      addNotification('Password must be at least 6 characters long.', 'error', 'parent');
      return;
    }

    try {
      setLoading(true);
      await operations.updatePassword(password);
      addNotification('Password changed successfully!', 'success', 'parent');
      setPassword('');
    } catch (error) {
      addNotification('Failed to change password. Please try again.', 'error', 'parent');
    } finally {
      setLoading(false);
    }
  };

  // Handle new child addition
  const handleNewChildChange = (e) => {
    const { name, value } = e.target;
    setNewChild((prev) => ({ ...prev, [name]: value }));
  };

  const addChild = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await operations.createChild(newChild);
      setChildren(prev => [...prev, response.data]);
      setNewChild({ name: '', age: '', specialNeeds: '', sessionType: 'half-day' });
      addNotification('Child added successfully! Please submit enrollment request.', 'success', 'parent');
    } catch (error) {
      addNotification('Failed to add child. Please try again.', 'error', 'parent');
    } finally {
      setLoading(false);
    }
  };

  // Handle child editing
  const handleEditChildChange = (e) => {
    const { name, value } = e.target;
    setEditingChild((prev) => ({ ...prev, [name]: value }));
  };

  const startEditingChild = (child) => {
    setEditingChild({ ...child });
  };

  const saveEditedChild = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await operations.updateChild(editingChild.id, editingChild);
      setChildren(prev => prev.map(child => child.id === editingChild.id ? response.data : child));
      setEditingChild(null);
      addNotification('Child profile updated successfully!', 'success', 'parent');
    } catch (error) {
      addNotification('Failed to update child profile. Please try again.', 'error', 'parent');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingChild(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    navigate('/login');
  };

  // Filter parent-specific notifications
  const parentNotifications = notifications.filter(n => n.role === 'parent' || n.role === 'all');

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Notifications role="parent" /> {/* Global notifications */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Parent Dashboard</h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'notifications' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'payments' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Payment History
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('children')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'children' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Children
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'password' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Change Password
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'notifications' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            {parentNotifications.length > 0 ? (
              <ul className="space-y-4">
                {parentNotifications.map((note) => (
                  <li key={note.id} className="border-b pb-2">
                    <p>{note.message}</p>
                    <span className="text-sm text-gray-500">{new Date(note.timestamp).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No new notifications.</p>
            )}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
            {paymentHistory.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Date</th>
                    <th className="p-2">Amount (K)</th>
                    <th className="p-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="p-2">{payment.date}</td>
                      <td className="p-2">{payment.amount}</td>
                      <td className="p-2">{payment.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No payment history available.</p>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="parentName"
                  value={profile.parentName}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={saveProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === 'children' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your Children</h2>
            {children.map((child) => (
              <div key={child.id} className="border-b pb-4 mb-4">
                {editingChild && editingChild.id === child.id ? (
                  <form onSubmit={saveEditedChild} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Child's Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editingChild.name}
                        onChange={handleEditChildChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={editingChild.age}
                        onChange={handleEditChildChange}
                        min="0"
                        max="5"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Special Needs</label>
                      <textarea
                        name="specialNeeds"
                        value={editingChild.specialNeeds}
                        onChange={handleEditChildChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Session Type</label>
                      <select
                        name="sessionType"
                        value={editingChild.sessionType}
                        onChange={handleEditChildChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="half-day">Half-Day</option>
                        <option value="full-day">Full-Day</option>
                      </select>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p><strong>Name:</strong> {child.name}</p>
                    <p><strong>Age:</strong> {child.age}</p>
                    <p><strong>Special Needs:</strong> {child.specialNeeds || 'None'}</p>
                    <p><strong>Session Type:</strong> {child.sessionType}</p>
                    <button
                      onClick={() => startEditingChild(child)}
                      className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            ))}
            <h3 className="text-xl font-semibold mt-6 mb-4">Add a New Child</h3>
            <form onSubmit={addChild} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Child's Name</label>
                <input
                  type="text"
                  name="name"
                  value={newChild.name}
                  onChange={handleNewChildChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newChild.age}
                  onChange={handleNewChildChange}
                  min="0"
                  max="5"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Special Needs</label>
                <textarea
                  name="specialNeeds"
                  value={newChild.specialNeeds}
                  onChange={handleNewChildChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Session Type</label>
                <select
                  name="sessionType"
                  value={newChild.sessionType}
                  onChange={handleNewChildChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="half-day">Half-Day</option>
                  <option value="full-day">Full-Day</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Child
              </button>
            </form>
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

export default ParentDashboard;