// src/pages/ManagerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Notifications from '../components/Notification';
import { useNotifications } from '../context/NotificationContext';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { notifications, addNotification, removeNotification } = useNotifications();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [babysitters, setBabysitters] = useState([
    { id: 1, firstName: 'Mary', lastName: 'Smith', email: 'mary@example.com', phone: '+256 987 654 321', nin: 'CM12345678', age: 25, nextOfKin: { name: 'John Smith', phone: '+256 111 222 333' } },
  ]);

  const [children, setChildren] = useState([
    { id: 1, name: 'John Doe', age: 3, parentPhone: '+256 123 456 789', sessionType: 'full-day', approved: true, paymentDue: 5000, paymentStatus: 'pending', lastCheckIn: null },
  ]);

  const [pendingChildren, setPendingChildren] = useState([
    { id: 2, name: 'Emma Brown', age: 2, parentPhone: '+256 999 888 777', sessionType: 'half-day', approved: false, paymentDue: 2000, paymentStatus: 'pending' },
  ]);

  const [schedules, setSchedules] = useState([
    { id: 1, babysitterId: 1, date: '2025-04-10', time: '08:00 - 17:00', children: ['John Doe'], sessionType: 'full-day', attended: true },
  ]);

  const [payments, setPayments] = useState([
    { id: 1, babysitterId: 1, date: '2025-04-09', amount: 5000, children: 1, sessionType: 'full-day', cleared: false },
  ]);

  const [expenses, setExpenses] = useState([
    { id: 1, date: '2025-04-09', amount: 10000, description: 'Babysitter Salary - Mary Smith', category: 'salaries' },
  ]);

  const [budget, setBudget] = useState({ salaries: 5000, toys: 3000, maintenance: 5000, utilities: 2000 });

  const [newBabysitter, setNewBabysitter] = useState({ firstName: '', lastName: '', email: '', phone: '', nin: '', age: '', nextOfKin: { name: '', phone: '' } });
  const [newChild, setNewChild] = useState({ name: '', age: '', parentPhone: '', sessionType: 'half-day' });
  const [newSchedule, setNewSchedule] = useState({ babysitterId: '', date: '', time: '', children: [], sessionType: 'half-day' });
  const [activeTab, setActiveTab] = useState('notifications'); // Default to notifications

  const budgetAdherence = Object.keys(budget).map(category => ({
    category,
    budget: budget[category],
    spent: expenses.filter(exp => exp.category === category).reduce((sum, exp) => sum + exp.amount, 0),
  }));

  useEffect(() => {
    budgetAdherence.forEach(({ category, budget, spent }) => {
      if (spent > budget) {
        addNotification(`Budget exceeded for ${category} by ${spent - budget} K (Budget: ${budget} K, Spent: ${spent} K)`, 'error', 'manager');
      }
    });
  }, [budgetAdherence, addNotification]);

  const handleBabysitterChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('nextOfKin')) {
      const field = name.split('.')[1];
      setNewBabysitter((prev) => ({ ...prev, nextOfKin: { ...prev.nextOfKin, [field]: value } }));
    } else {
      setNewBabysitter((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addBabysitter = (e) => {
    e.preventDefault();
    const age = Number(newBabysitter.age);
    if (age < 21 || age > 35) {
      addNotification('Babysitter must be between 21 and 35 years old.', 'error', 'manager');
      return;
    }
    if (!newBabysitter.firstName || !newBabysitter.lastName || !newBabysitter.phone || !newBabysitter.nin || !newBabysitter.nextOfKin.name || !newBabysitter.nextOfKin.phone) {
      addNotification('Please fill all required fields for babysitter registration.', 'error', 'manager');
      return;
    }
    setBabysitters((prev) => [...prev, { ...newBabysitter, id: prev.length + 1, age }]);
    setNewBabysitter({ firstName: '', lastName: '', email: '', phone: '', nin: '', age: '', nextOfKin: { name: '', phone: '' } });
    addNotification('Babysitter registered successfully!', 'success', 'manager');
  };

  const handleChildChange = (e) => {
    const { name, value } = e.target;
    setNewChild((prev) => ({ ...prev, [name]: value }));
  };

  const addChildDirectly = (e) => {
    e.preventDefault();
    if (!newChild.name || !newChild.age || !newChild.parentPhone) {
      addNotification('Please fill all required fields for child enrollment.', 'error', 'manager');
      return;
    }
    const age = Number(newChild.age);
    if (age < 0 || age > 5) {
      addNotification('Child age must be between 0 and 5.', 'error', 'manager');
      return;
    }
    const paymentDue = newChild.sessionType === 'full-day' ? 5000 : 2000;
    const newChildData = { ...newChild, id: children.length + 1, age, approved: true, paymentDue, paymentStatus: 'pending', lastCheckIn: null };
    setChildren((prev) => [...prev, newChildData]);
    setNewChild({ name: '', age: '', parentPhone: '', sessionType: 'half-day' });
    addNotification(`${newChildData.name} enrolled successfully! Payment of ${paymentDue} K due.`, 'success', 'manager');
    addNotification(`Welcome ${newChildData.name}! Payment of ${paymentDue} K due for ${newChildData.sessionType}.`, 'info', 'parent');
  };

  const approveChild = (childId) => {
    const child = pendingChildren.find(c => c.id === childId);
    setChildren((prev) => [...prev, { ...child, approved: true }]);
    setPendingChildren((prev) => prev.filter(c => c.id !== childId));
    addNotification(`${child.name} approved and added to the system!`, 'success', 'manager');
    addNotification(`Your child ${child.name} has been approved! Payment of ${child.paymentDue} K due.`, 'success', 'parent');
  };

  const rejectChild = (childId) => {
    const child = pendingChildren.find(c => c.id === childId);
    setPendingChildren((prev) => prev.filter(c => c.id !== childId));
    addNotification(`Enrollment request for ${child.name} rejected.`, 'warning', 'manager');
    addNotification(`Enrollment request for ${child.name} was rejected.`, 'warning', 'parent');
  };

  const checkInChild = (childId) => {
    setChildren((prev) =>
      prev.map(c =>
        c.id === childId ? { ...c, lastCheckIn: new Date().toISOString() } : c
      )
    );
    const child = children.find(c => c.id === childId);
    addNotification(`${child.name} checked in at ${new Date().toLocaleTimeString()}.`, 'info', 'parent');
  };

  const checkOutChild = (childId) => {
    const child = children.find(c => c.id === childId);
    addNotification(`${child.name} checked out at ${new Date().toLocaleTimeString()}.`, 'info', 'parent');
  };

  const sendPaymentReminder = (childId) => {
    const child = children.find(c => c.id === childId);
    if (child.paymentStatus === 'pending') {
      addNotification(`Reminder: Payment of ${child.paymentDue} K due for ${child.name}'s ${child.sessionType} session.`, 'warning', 'parent');
      addNotification(`Sent payment reminder for ${child.name}.`, 'info', 'manager');
    }
  };

  const markOverdue = (childId) => {
    setChildren((prev) =>
      prev.map(c =>
        c.id === childId && c.paymentStatus === 'pending' ? { ...c, paymentStatus: 'overdue' } : c
      )
    );
    const child = children.find(c => c.id === childId);
    if (child.paymentStatus === 'overdue') {
      addNotification(`Payment of ${child.paymentDue} K for ${child.name} is overdue!`, 'error', 'parent');
      addNotification(`${child.name}'s payment marked as overdue.`, 'warning', 'manager');
    }
  };

  const calculatePayment = (childrenCount, sessionType) => {
    const rate = sessionType === 'full-day' ? 5000 : 2000;
    return childrenCount * rate;
  };

  const clearPayment = (paymentId) => {
    setPayments((prev) => prev.map(p => p.id === paymentId ? { ...p, cleared: true } : p));
    addNotification('Babysitter payment cleared successfully!', 'success', 'manager');
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const addSchedule = (e) => {
    e.preventDefault();
    if (!newSchedule.babysitterId || !newSchedule.date || !newSchedule.time) {
      addNotification('Please fill all required fields for scheduling.', 'error', 'manager');
      return;
    }
    const selectedChildren = children.filter(c => c.sessionType === newSchedule.sessionType).map(c => c.name).slice(0, 1);
    const paymentAmount = calculatePayment(selectedChildren.length, newSchedule.sessionType);
    setSchedules((prev) => [...prev, { ...newSchedule, id: prev.length + 1, babysitterId: Number(newSchedule.babysitterId), children: selectedChildren, attended: false }]);
    setPayments((prev) => [...prev, { id: prev.length + 1, babysitterId: Number(newSchedule.babysitterId), date: newSchedule.date, amount: paymentAmount, children: selectedChildren.length, sessionType: newSchedule.sessionType, cleared: false }]);
    setNewSchedule({ babysitterId: '', date: '', time: '', children: [], sessionType: 'half-day' });
    addNotification(`Schedule added for ${babysitters.find(b => b.id === Number(newSchedule.babysitterId))?.firstName} on ${newSchedule.date}.`, 'success', 'manager');
  };

  const toggleAttendance = (scheduleId) => {
    setSchedules((prev) => prev.map(s => s.id === scheduleId ? { ...s, attended: !s.attended } : s));
    const schedule = schedules.find(s => s.id === scheduleId);
    addNotification(`${babysitters.find(b => b.id === schedule.babysitterId)?.firstName}'s attendance updated to ${schedule.attended ? 'Not Attended' : 'Attended'}.`, 'info', 'manager');
  };

  const exportScheduleReport = () => {
    console.log('Schedule Report:', schedules);
    addNotification('Schedule report exported (simulated).', 'success', 'manager');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const managerNotifications = notifications.filter(n => n.role === 'manager' || n.role === 'all');

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Notifications role="manager" />
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">Manager Dashboard</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button onClick={() => setActiveTab('notifications')} className={`px-4 py-2 rounded-lg ${activeTab === 'notifications' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Notifications</button>
          <button onClick={() => setActiveTab('babysitters')} className={`px-4 py-2 rounded-lg ${activeTab === 'babysitters' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Babysitters</button>
          <button onClick={() => setActiveTab('payments')} className={`px-4 py-2 rounded-lg ${activeTab === 'payments' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Payments</button>
          <button onClick={() => setActiveTab('schedules')} className={`px-4 py-2 rounded-lg ${activeTab === 'schedules' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Schedules</button>
          <button onClick={() => setActiveTab('children')} className={`px-4 py-2 rounded-lg ${activeTab === 'children' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Children</button>
          <button onClick={() => setActiveTab('financials')} className={`px-4 py-2 rounded-lg ${activeTab === 'financials' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Financials</button>
        </div>

        {activeTab === 'notifications' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Notifications</h2>
            {managerNotifications.length > 0 ? (
              <ul className="space-y-4">
                {managerNotifications.map((note) => (
                  <li key={note.id} className="border-b pb-2 flex justify-between items-center">
                    <div>
                      <p>{note.message}</p>
                      <span className="text-sm text-gray-500">{new Date(note.timestamp).toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => removeNotification(note.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      aria-label="Close notification"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No new notifications.</p>
            )}
          </div>
        )}

        {activeTab === 'babysitters' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Babysitter Management</h2>
            <div className="mb-6">
              {babysitters.map((b) => (
                <div key={b.id} className="border-b py-4">
                  <p><strong>{b.firstName} {b.lastName}</strong></p>
                  <p>Email: {b.email || 'N/A'}</p>
                  <p>Phone: {b.phone}</p>
                  <p>NIN: {b.nin}</p>
                  <p>Age: {b.age}</p>
                  <p>Next of Kin: {b.nextOfKin.name} ({b.nextOfKin.phone})</p>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Register New Babysitter</h3>
            <form onSubmit={addBabysitter} className="space-y-4">
              <input type="text" name="firstName" value={newBabysitter.firstName} onChange={handleBabysitterChange} placeholder="First Name" required className="w-full px-3 py-2 border rounded-md" />
              <input type="text" name="lastName" value={newBabysitter.lastName} onChange={handleBabysitterChange} placeholder="Last Name" required className="w-full px-3 py-2 border rounded-md" />
              <input type="email" name="email" value={newBabysitter.email} onChange={handleBabysitterChange} placeholder="Email (optional)" className="w-full px-3 py-2 border rounded-md" />
              <input type="tel" name="phone" value={newBabysitter.phone} onChange={handleBabysitterChange} placeholder="Phone" required className="w-full px-3 py-2 border rounded-md" />
              <input type="text" name="nin" value={newBabysitter.nin} onChange={handleBabysitterChange} placeholder="NIN" required className="w-full px-3 py-2 border rounded-md" />
              <input type="number" name="age" value={newBabysitter.age} onChange={handleBabysitterChange} placeholder="Age (21-35)" required className="w-full px-3 py-2 border rounded-md" />
              <input type="text" name="nextOfKin.name" value={newBabysitter.nextOfKin.name} onChange={handleBabysitterChange} placeholder="Next of Kin Name" required className="w-full px-3 py-2 border rounded-md" />
              <input type="tel" name="nextOfKin.phone" value={newBabysitter.nextOfKin.phone} onChange={handleBabysitterChange} placeholder="Next of Kin Phone" required className="w-full px-3 py-2 border rounded-md" />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Register Babysitter</button>
            </form>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Babysitter Payments</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Date</th>
                  <th className="p-2">Babysitter</th>
                  <th className="p-2">Amount (K)</th>
                  <th className="p-2">Children</th>
                  <th className="p-2">Session</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{p.date}</td>
                    <td className="p-2">{babysitters.find(b => b.id === p.babysitterId)?.firstName} {babysitters.find(b => b.id === p.babysitterId)?.lastName}</td>
                    <td className="p-2">{p.amount}</td>
                    <td className="p-2">{p.children}</td>
                    <td className="p-2">{p.sessionType}</td>
                    <td className="p-2">{p.cleared ? 'Cleared' : 'Pending'}</td>
                    <td className="p-2">
                      {!p.cleared && <button onClick={() => clearPayment(p.id)} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Clear</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'schedules' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Babysitter Schedules & Attendance</h2>
            <div className="mb-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Date</th>
                    <th className="p-2">Time</th>
                    <th className="p-2">Babysitter</th>
                    <th className="p-2">Children</th>
                    <th className="p-2">Session</th>
                    <th className="p-2">Attended</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((s) => (
                    <tr key={s.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{s.date}</td>
                      <td className="p-2">{s.time}</td>
                      <td className="p-2">{babysitters.find(b => b.id === s.babysitterId)?.firstName} {babysitters.find(b => b.id === s.babysitterId)?.lastName}</td>
                      <td className="p-2">{s.children.join(', ')}</td>
                      <td className="p-2">{s.sessionType}</td>
                      <td className="p-2">
                        <button onClick={() => toggleAttendance(s.id)} className={`px-2 py-1 rounded ${s.attended ? 'bg-green-500' : 'bg-red-500'} text-white hover:opacity-80`}>
                          {s.attended ? 'Yes' : 'No'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={exportScheduleReport} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Export Schedule Report</button>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Add Schedule</h3>
            <form onSubmit={addSchedule} className="space-y-4">
              <select name="babysitterId" value={newSchedule.babysitterId} onChange={handleScheduleChange} className="w-full px-3 py-2 border rounded-md">
                <option value="">Select Babysitter</option>
                {babysitters.map(b => <option key={b.id} value={b.id}>{b.firstName} {b.lastName}</option>)}
              </select>
              <input type="date" name="date" value={newSchedule.date} onChange={handleScheduleChange} className="w-full px-3 py-2 border rounded-md" />
              <input type="text" name="time" value={newSchedule.time} onChange={handleScheduleChange} placeholder="e.g., 08:00 - 17:00" className="w-full px-3 py-2 border rounded-md" />
              <select name="sessionType" value={newSchedule.sessionType} onChange={handleScheduleChange} className="w-full px-3 py-2 border rounded-md">
                <option value="half-day">Half-Day</option>
                <option value="full-day">Full-Day</option>
              </select>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add Schedule</button>
            </form>
          </div>
        )}

        {activeTab === 'children' && (
          <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Child Management</h2>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Enrolled Children</h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Name</th>
                    <th className="p-2">Age</th>
                    <th className="p-2">Parent Phone</th>
                    <th className="p-2">Session</th>
                    <th className="p-2">Payment</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {children.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{c.name}</td>
                      <td className="p-2">{c.age}</td>
                      <td className="p-2">{c.parentPhone}</td>
                      <td className="p-2">{c.sessionType}</td>
                      <td className="p-2">{c.paymentStatus === 'pending' ? `${c.paymentDue} K Due` : c.paymentStatus === 'overdue' ? `${c.paymentDue} K Overdue` : 'Paid'}</td>
                      <td className="p-2">
                        <button onClick={() => checkInChild(c.id)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">Check In</button>
                        <button onClick={() => checkOutChild(c.id)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">Check Out</button>
                        {c.paymentStatus !== 'paid' && (
                          <>
                            <button onClick={() => sendPaymentReminder(c.id)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2">Remind</button>
                            <button onClick={() => markOverdue(c.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Overdue</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Pending Enrollments</h3>
              {pendingChildren.length === 0 ? (
                <p className="text-gray-700">No pending enrollments.</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2">Name</th>
                      <th className="p-2">Age</th>
                      <th className="p-2">Parent Phone</th>
                      <th className="p-2">Session Type</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingChildren.map((c) => (
                      <tr key={c.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{c.name}</td>
                        <td className="p-2">{c.age}</td>
                        <td className="p-2">{c.parentPhone}</td>
                        <td className="p-2">{c.sessionType}</td>
                        <td className="p-2">
                          <button onClick={() => approveChild(c.id)} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2">Approve</button>
                          <button onClick={() => rejectChild(c.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Enroll New Child</h3>
              <form onSubmit={addChildDirectly} className="space-y-4">
                <input type="text" name="name" value={newChild.name} onChange={handleChildChange} placeholder="Child's Name" required className="w-full px-3 py-2 border rounded-md" />
                <input type="number" name="age" value={newChild.age} onChange={handleChildChange} placeholder="Age (0-5)" required className="w-full px-3 py-2 border rounded-md" />
                <input type="tel" name="parentPhone" value={newChild.parentPhone} onChange={handleChildChange} placeholder="Parent Phone" required className="w-full px-3 py-2 border rounded-md" />
                <select name="sessionType" value={newChild.sessionType} onChange={handleChildChange} className="w-full px-3 py-2 border rounded-md">
                  <option value="half-day">Half-Day</option>
                  <option value="full-day">Full-Day</option>
                </select>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Enroll Child</button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Financial Management</h2>
            <p>Total Expenses: {expenses.reduce((s, e) => s + e.amount, 0)} K</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default ManagerDashboard;