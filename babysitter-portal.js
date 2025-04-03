import React, { useState } from 'react';

const BabysitterPortal = () => {
  // Placeholder data (replace with API calls later)
  const [assignedChildren, setAssignedChildren] = useState([
    { id: 1, name: 'Emma Kizito', checkedIn: false, session: 'Full-day' },
    { id: 2, name: 'Liam Okello', checkedIn: true, session: 'Half-day' },
    { id: 3, name: 'Ava Nakato', checkedIn: false, session: 'Full-day' },
  ]);

  const [incident, setIncident] = useState({ childName: '', details: '' });
  const [incidents, setIncidents] = useState([]);

  // Handle attendance toggle
  const toggleAttendance = (childId) => {
    setAssignedChildren((prev) =>
      prev.map((child) =>
        child.id === childId ? { ...child, checkedIn: !child.checkedIn } : child
      )
    );
  };

  // Handle incident submission
  const handleIncidentSubmit = (e) => {
    e.preventDefault();
    if (!incident.childName || !incident.details) return;
    setIncidents([...incidents, { ...incident, id: Date.now() }]);
    setIncident({ childName: '', details: '' }); // Reset form
    // Later: Send to backend (e.g., fetch('/api/incidents', { method: 'POST', ... }))
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Babysitter Portal</h2>
        <ul style={styles.navList}>
          <li style={styles.navItemActive}>My Tasks</li>
          <li style={styles.navItem}>Schedule</li>
          <li style={styles.navItem}>Profile</li>
          <li style={styles.navItem}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Welcome, Babysitter!</h1>
        <p style={styles.subtitle}>Manage your assigned children - April 03, 2025</p>

        {/* Assigned Children Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Assigned Children</h2>
          <ul style={styles.childList}>
            {assignedChildren.map((child) => (
              <li key={child.id} style={styles.childItem}>
                <span style={styles.childName}>{child.name} ({child.session})</span>
                <button
                  onClick={() => toggleAttendance(child.id)}
                  style={{
                    ...styles.attendanceButton,
                    backgroundColor: child.checkedIn ? '#ff6f61' : '#87ceeb',
                  }}
                >
                  {child.checkedIn ? 'Check Out' : 'Check In'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Incident Reporting Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Report an Incident</h2>
          <form onSubmit={handleIncidentSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Child Name</label>
              <input
                type="text"
                value={incident.childName}
                onChange={(e) => setIncident({ ...incident, childName: e.target.value })}
                style={styles.input}
                placeholder="e.g., Emma Kizito"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Incident Details</label>
              <textarea
                value={incident.details}
                onChange={(e) => setIncident({ ...incident, details: e.target.value })}
                style={styles.textarea}
                placeholder="Describe the incident..."
              />
            </div>
            <button type="submit" style={styles.submitButton}>Submit Report</button>
          </form>

          {/* Reported Incidents */}
          {incidents.length > 0 && (
            <div style={styles.incidentList}>
              <h3 style={styles.subSectionTitle}>Reported Incidents</h3>
              <ul style={styles.alertList}>
                {incidents.map((inc) => (
                  <li key={inc.id} style={styles.alertItem}>
                    {inc.childName}: {inc.details}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
  childList: { listStyle: 'none', padding: 0 },
  childItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #eee' },
  childName: { fontSize: '16px', color: '#333' },
  attendanceButton: { padding: '8px 15px', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', transition: 'background-color 0.3s ease' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: { fontSize: '14px', color: '#333', marginBottom: '5px', fontWeight: 'bold' },
  input: { width: '100%', padding: '12px', fontSize: '16px', borderRadius: '10px', border: '2px solid #87ceeb', outline: 'none', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '12px', fontSize: '16px', borderRadius: '10px', border: '2px solid #87ceeb', outline: 'none', minHeight: '100px', boxSizing: 'border-box' },
  submitButton: { backgroundColor: '#ff6f61', color: '#fff', padding: '12px', fontSize: '18px', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: 'background-color 0.3s ease' },
  incidentList: { marginTop: '20px' },
  subSectionTitle: { fontSize: '18px', color: '#ff6f61', marginBottom: '10px' },
  alertList: { listStyle: 'none', padding: 0 },
  alertItem: { backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '10px', border: '2px solid #ffd700', color: '#333' },
};

export default BabysitterPortal;