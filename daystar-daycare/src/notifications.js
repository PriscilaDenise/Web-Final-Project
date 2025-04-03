import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Child Emma checked in at 8:00 AM', date: '2025-04-03' },
    { id: 2, text: 'Payment reminder sent to Parent A', date: '2025-04-03' },
    { id: 3, text: 'Budget threshold exceeded for utilities', date: '2025-04-03' },
  ]);
  const [manualForm, setManualForm] = useState({ recipient: '', message: '' });

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualForm.recipient || !manualForm.message) return;
    setNotifications([...notifications, { id: Date.now(), text: `${manualForm.message} (to ${manualForm.recipient})`, date: '2025-04-03' }]);
    setManualForm({ recipient: '', message: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Daystar Daycare</h2>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
          <li style={styles.navItem}><Link to="/babysitter-management" style={styles.link}>Babysitter Management</Link></li>
          <li style={styles.navItem}><Link to="/child-management" style={styles.link}>Child Management</Link></li>
          <li style={styles.navItem}><Link to="/financials" style={styles.link}>Financials</Link></li>
          <li style={styles.navItemActive}><Link to="/notifications" style={styles.link}>Notifications</Link></li>
          <li style={styles.navItem}><Link to="/reports" style={styles.link}>Reports</Link></li>
          <li style={styles.navItem}><Link to="/profile" style={styles.link}>Profile</Link></li>
          <li style={styles.navItem}><Link to="/" style={styles.link}>Logout</Link></li>
        </ul>
      </div>

      <div style={styles.mainContent}>
        <h1 style={styles.title}>Notifications</h1>
        <p style={styles.subtitle}>Manage alerts - April 03, 2025</p>

        {/* Manual Notification Form */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Send Manual Notification</h2>
          <form onSubmit={handleManualSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Recipient</label>
              <input type="text" name="recipient" value={manualForm.recipient} onChange={(e) => setManualForm({ ...manualForm, recipient: e.target.value })} style={styles.input} placeholder="e.g., Parent A" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Message</label>
              <input type="text" name="message" value={manualForm.message} onChange={(e) => setManualForm({ ...manualForm, message: e.target.value })} style={styles.input} placeholder="e.g., Payment due tomorrow" />
            </div>
            <button type="submit" style={styles.submitButton}>Send</button>
          </form>
        </div>

        {/* Notification List */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent Notifications</h2>
          <ul style={styles.notificationList}>
            {notifications.map((notif) => (
              <li key={notif.id} style={styles.notificationItem}>
                {notif.text} - <span style={styles.date}>{notif.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

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
  submitButton: { backgroundColor: '#ff6f61', color: '#fff', padding: '12px', fontSize: '18px', border: 'none', borderRadius: '10px', cursor: 'pointer', gridColumn: '1 / -1' },
  notificationList: { listStyle: 'none', padding: 0 },
  notificationItem: { padding: '15px', borderBottom: '1px solid #eee', color: '#333' },
  date: { fontSize: '12px', color: '#666' },
};

export default Notifications;