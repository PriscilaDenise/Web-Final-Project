import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChildManagement = () => {
  // State for child registration form
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    parentContact: '',
    specialNeeds: '',
    session: 'Half-day',
  });
  const [error, setError] = useState('');

  // State for child list (placeholder data)
  const [children, setChildren] = useState([
    { id: 1, name: 'Emma Kizito', age: 3, parentContact: '0771234567', session: 'Full-day', checkedIn: true, incidents: ['Minor fall reported'] },
    { id: 2, name: 'Liam Okello', age: 2, parentContact: '0789876543', session: 'Half-day', checkedIn: false, incidents: [] },
  ]);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle registration submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, age, parentContact, session } = form;
    if (!fullName || !age || !parentContact || !session) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    const newChild = {
      id: Date.now(),
      name: fullName,
      age: parseInt(age, 10),
      parentContact,
      session,
      checkedIn: false,
      incidents: [],
    };
    setChildren([...children, newChild]);
    setForm({ fullName: '', age: '', parentContact: '', specialNeeds: '', session: 'Half-day' });
    // Later: Send to backend (e.g., fetch('/api/children', { method: 'POST', ... }))
  };

  // Handle attendance toggle
  const toggleAttendance = (childId) => {
    setChildren((prev) =>
      prev.map((child) =>
        child.id === childId ? { ...child, checkedIn: !child.checkedIn } : child
      )
    );
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Daystar Daycare</h2>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
          <li style={styles.navItem}><Link to="/babysitter-management" style={styles.link}>Babysitter Management</Link></li>
          <li style={styles.navItemActive}><Link to="/child-management" style={styles.link}>Child Management</Link></li>
          <li style={styles.navItem}><Link to="/financials" style={styles.link}>Financials</Link></li>
          <li style={styles.navItem}><Link to="/notifications" style={styles.link}>Notifications</Link></li>
          <li style={styles.navItem}><Link to="/reports" style={styles.link}>Reports</Link></li>
          <li style={styles.navItem}><Link to="/profile" style={styles.link}>Profile</Link></li>
          <li style={styles.navItem}><Link to="/" style={styles.link}>Logout</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Child Management</h1>
        <p style={styles.subtitle}>Manage enrolled children - April 03, 2025</p>

        {/* Registration Form */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Enroll New Child</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., Emma Kizito"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Age *</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., 3"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Parent/Guardian Contact *</label>
              <input
                type="text"
                name="parentContact"
                value={form.parentContact}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., 0771234567"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Special Care Needs</label>
              <input
                type="text"
                name="specialNeeds"
                value={form.specialNeeds}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., Nut allergy"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Session Duration *</label>
              <select
                name="session"
                value={form.session}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Half-day">Half-day</option>
                <option value="Full-day">Full-day</option>
              </select>
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.submitButton}>Enroll Child</button>
          </form>
        </div>

        {/* Child List */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Enrolled Children</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Age</th>
                <th style={styles.th}>Parent Contact</th>
                <th style={styles.th}>Session</th>
                <th style={styles.th}>Attendance</th>
                <th style={styles.th}>Incidents</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child) => (
                <tr key={child.id} style={styles.tr}>
                  <td style={styles.td}>{child.name}</td>
                  <td style={styles.td}>{child.age}</td>
                  <td style={styles.td}>{child.parentContact}</td>
                  <td style={styles.td}>{child.session}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => toggleAttendance(child.id)}
                      style={{
                        ...styles.attendanceButton,
                        backgroundColor: child.checkedIn ? '#ff6f61' : '#87ceeb',
                      }}
                    >
                      {child.checkedIn ? 'Check Out' : 'Check In'}
                    </button>
                  </td>
                  <td style={styles.td}>
                    {child.incidents.length > 0 ? child.incidents.join(', ') : 'None'}
                  </td>
                  <td style={styles.td}>
                    <button style={styles.actionButton}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Creative Styling
const styles = {
  container: { display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f9e1e1, #d4e8f7)', fontFamily: "'Trebuchet MS', sans-serif" },
  sidebar: { width: '250px', backgroundColor: '#ff6f61', padding: '20px', color: '#fff', borderRight: '2px solid #ffd700' },
  sidebarTitle: { fontSize: '24px', marginBottom: '30px', fontWeight: 'bold' },
  navList: { listStyle: 'none', padding: 0 },
  navItem: { padding: '15px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease' },
  navItemActive: { padding: '15px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#e65b50' },
  link: { color: '#fff', textDecoration: 'none', display: 'block' },
  mainContent: { flex: 1, padding: '40px' },
  title: { fontSize: '32px', color: '#ff6f61', marginBottom: '10px', fontWeight: 'bold' },
  subtitle: { fontSize: '16px', color: '#666', marginBottom: '30px' },
  section: { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', border: '2px solid #87ceeb', marginBottom: '40px' },
  sectionTitle: { fontSize: '24px', color: '#ff6f61', marginBottom: '15px' },
  form: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: { fontSize: '14px', color: '#333', marginBottom: '5px', fontWeight: 'bold' },
  input: { width: '100%', padding: '12px', fontSize: '16px', borderRadius: '10px', border: '2px solid #87ceeb', outline: 'none', boxSizing: 'border-box' },
  select: { width: '100%', padding: '12px', fontSize: '16px', borderRadius: '10px', border: '2px solid #87ceeb', outline: 'none' },
  error: { color: '#ff4444', fontSize: '14px', gridColumn: '1 / -1', margin: '0 0 10px' },
  submitButton: { backgroundColor: '#ff6f61', color: '#fff', padding: '12px', fontSize: '18px', border: 'none', borderRadius: '10px', cursor: 'pointer', gridColumn: '1 / -1' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '15px', backgroundColor: '#ff6f61', color: '#fff', textAlign: 'left', borderBottom: '2px solid #ffd700' },
  td: { padding: '15px', borderBottom: '1px solid #eee', color: '#333' },
  tr: { transition: 'background-color 0.3s ease' },
  attendanceButton: { padding: '8px 15px', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', transition: 'background-color 0.3s ease' },
  actionButton: { backgroundColor: '#87ceeb', color: '#fff', padding: '8px 15px', border: 'none', borderRadius: '10px', cursor: 'pointer' },
};

export default ChildManagement;