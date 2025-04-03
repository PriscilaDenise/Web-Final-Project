import React, { useState } from 'react';

const BabysitterManagement = () => {
  // State for babysitter registration form
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nin: '',
    age: '',
    nextOfKin: '',
  });
  const [error, setError] = useState('');

  // State for babysitter list (placeholder data)
  const [babysitters, setBabysitters] = useState([
    { id: 1, name: 'Sarah Mbabazi', phone: '0771234567', schedule: 'Full-day', children: 3, payment: 15000 },
    { id: 2, name: 'John Kato', phone: '0789876543', schedule: 'Half-day', children: 2, payment: 4000 },
  ]);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle registration submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, nin, age, nextOfKin } = form;
    if (!firstName || !lastName || !phone || !nin || !age || !nextOfKin) {
      setError('Please fill in all required fields.');
      return;
    }
    const ageNum = parseInt(age, 10);
    if (ageNum < 21 || ageNum > 35) {
      setError('Age must be between 21 and 35.');
      return;
    }
    setError('');
    const newBabysitter = {
      id: Date.now(),
      name: `${firstName} ${lastName}`,
      phone,
      schedule: 'Unassigned',
      children: 0,
      payment: 0,
    };
    setBabysitters([...babysitters, newBabysitter]);
    setForm({ firstName: '', lastName: '', email: '', phone: '', nin: '', age: '', nextOfKin: '' });
    // Later: Send to backend (e.g., fetch('/api/babysitters', { method: 'POST', ... }))
  };

  // Handle schedule update (placeholder)
  const updateSchedule = (id, newSchedule) => {
    setBabysitters(
      babysitters.map((bs) =>
        bs.id === id ? { ...bs, schedule: newSchedule, payment: newSchedule === 'Full-day' ? bs.children * 5000 : bs.children * 2000 } : bs
      )
    );
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Daystar Daycare</h2>
        <ul style={styles.navList}>
          <li style={styles.navItem}>Dashboard</li>
          <li style={styles.navItemActive}>Babysitter Management</li>
          <li style={styles.navItem}>Child Management</li>
          <li style={styles.navItem}>Financials</li>
          <li style={styles.navItem}>Notifications</li>
          <li style={styles.navItem}>Reports</li>
          <li style={styles.navItem}>Profile</li>
          <li style={styles.navItem}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Babysitter Management</h1>
        <p style={styles.subtitle}>Manage your team - April 03, 2025</p>

        {/* Registration Form */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Register New Babysitter</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., Sarah"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., Mbabazi"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., sarah@example.com"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number *</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., 0771234567"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>National ID Number (NIN) *</label>
              <input
                type="text"
                name="nin"
                value={form.nin}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., CM12345678"
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
                placeholder="e.g., 25"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Next of Kin Contact *</label>
              <input
                type="text"
                name="nextOfKin"
                value={form.nextOfKin}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., 0789876543"
              />
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.submitButton}>Register Babysitter</button>
          </form>
        </div>

        {/* Babysitter List */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Current Babysitters</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Schedule</th>
                <th style={styles.th}>Children</th>
                <th style={styles.th}>Payment (UGX)</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {babysitters.map((bs) => (
                <tr key={bs.id} style={styles.tr}>
                  <td style={styles.td}>{bs.name}</td>
                  <td style={styles.td}>{bs.phone}</td>
                  <td style={styles.td}>
                    <select
                      value={bs.schedule}
                      onChange={(e) => updateSchedule(bs.id, e.target.value)}
                      style={styles.select}
                    >
                      <option value="Unassigned">Unassigned</option>
                      <option value="Half-day">Half-day</option>
                      <option value="Full-day">Full-day</option>
                    </select>
                  </td>
                  <td style={styles.td}>{bs.children}</td>
                  <td style={styles.td}>{bs.payment.toLocaleString()}</td>
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
  mainContent: { flex: 1, padding: '40px' },
  title: { fontSize: '32px', color: '#ff6f61', marginBottom: '10px', fontWeight: 'bold' },
  subtitle: { fontSize: '16px', color: '#666', marginBottom: '30px' },
  section: { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', border: '2px solid #87ceeb', marginBottom: '40px' },
  sectionTitle: { fontSize: '24px', color: '#ff6f61', marginBottom: '15px' },
  form: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: { fontSize: '14px', color: '#333', marginBottom: '5px', fontWeight: 'bold' },
  input: { width: '100%', padding: '12px', fontSize: '16px', borderRadius: '10px', border: '2px solid #87ceeb', outline: 'none', boxSizing: 'border-box' },
  error: { color: '#ff4444', fontSize: '14px', gridColumn: '1 / -1', margin: '0 0 10px' },
  submitButton: { backgroundColor: '#ff6f61', color: '#fff', padding: '12px', fontSize: '18px', border: 'none', borderRadius: '10px', cursor: 'pointer', gridColumn: '1 / -1' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '15px', backgroundColor: '#ff6f61', color: '#fff', textAlign: 'left', borderBottom: '2px solid #ffd700' },
  td: { padding: '15px', borderBottom: '1px solid #eee', color: '#333' },
  tr: { transition: 'background-color 0.3s ease' },
  select: { padding: '8px', borderRadius: '10px', border: '2px solid #87ceeb', fontSize: '14px' },
  actionButton: { backgroundColor: '#87ceeb', color: '#fff', padding: '8px 15px', border: 'none', borderRadius: '10px', cursor: 'pointer' },
};

export default BabysitterManagement;