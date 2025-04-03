import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReportsAndAnalytics = () => {
  const [reportForm, setReportForm] = useState({ type: 'Income', startDate: '', endDate: '' });
  const [reports, setReports] = useState([]);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportForm.type || !reportForm.startDate || !reportForm.endDate) return;
    setReports([...reports, { id: Date.now(), ...reportForm, status: 'Generated' }]);
    setReportForm({ type: 'Income', startDate: '', endDate: '' });
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
          <li style={styles.navItem}><Link to="/notifications" style={styles.link}>Notifications</Link></li>
          <li style={styles.navItemActive}><Link to="/reports" style={styles.link}>Reports</Link></li>
          <li style={styles.navItem}><Link to="/profile" style={styles.link}>Profile</Link></li>
          <li style={styles.navItem}><Link to="/" style={styles.link}>Logout</Link></li>
        </ul>
      </div>

      <div style={styles.mainContent}>
        <h1 style={styles.title}>Reports and Analytics</h1>
        <p style={styles.subtitle}>Generate reports - April 03, 2025</p>

        {/* Report Form */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Generate Report</h2>
          <form onSubmit={handleReportSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Report Type</label>
              <select name="type" value={reportForm.type} onChange={(e) => setReportForm({ ...reportForm, type: e.target.value })} style={styles.select}>
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
                <option value="Attendance">Attendance</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Start Date</label>
              <input type="date" name="startDate" value={reportForm.startDate} onChange={(e) => setReportForm({ ...reportForm, startDate: e.target.value })} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>End Date</label>
              <input type="date" name="endDate" value={reportForm.endDate} onChange={(e) => setReportForm({ ...reportForm, endDate: e.target.value })} style={styles.input} />
            </div>
            <button type="submit" style={styles.submitButton}>Generate</button>
          </form>
        </div>

        {/* Reports List */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Generated Reports</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Date Range</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((rep) => (
                <tr key={rep.id} style={styles.tr}>
                  <td style={styles.td}>{rep.type}</td>
                  <td style={styles.td}>{`${rep.startDate} to ${rep.endDate}`}</td>
                  <td style={styles.td}>{rep.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={styles.placeholderText}>[Chart Placeholder: Add Chart.js for trends]</p>
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
  form: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: { fontSize: '14px', color: '#333', marginBottom: '5px', fontWeight: 'bold' },
  input: { width: '100%', padding: '12px', fontSize: '16px', borderRadius: '10px', border: '2px solid #87ceeb', outline: 'none', boxSizing: 'border-box' },
  select: { width: '100%', padding: '12px', fontSize: '16px', borderRadius: '10px', border: '2px solid #87ceeb', outline: 'none' },
  submitButton: { backgroundColor: '#ff6f61', color: '#fff', padding: '12px', fontSize: '18px', border: 'none', borderRadius: '10px', cursor: 'pointer', gridColumn: '1 / -1' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '15px', backgroundColor: '#ff6f61', color: '#fff', textAlign: 'left', borderBottom: '2px solid #ffd700' },
  td: { padding: '15px', borderBottom: '1px solid #eee', color: '#333' },
  tr: { transition: 'background-color 0.3s ease' },
  placeholderText: { color: '#666', fontStyle: 'italic', marginTop: '20px' },
};

export default ReportsAndAnalytics;