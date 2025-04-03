import React from 'react';
import { Link } from 'react-router-dom'; // Fixed: Uppercase 'Link'

const Dashboard = () => {
  // Placeholder data (replace with API calls later)
  const dailyStats = {
    childrenPresent: 15,
    babysittersOnDuty: 4,
    totalIncome: 75000, // UGX
    totalExpenses: 30000, // UGX
    transactionsToday: 7,
  };

  const alerts = [
    { id: 1, text: 'Utilities budget exceeded by 5,000 UGX' },
    { id: 2, text: 'Payment overdue from Parent A (10,000 UGX)' },
    { id: 3, text: 'Incident reported: Child B - Minor fall' },
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Daystar Daycare</h2>
        <ul style={styles.navList}>
          <li style={styles.navItemActive}>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/babysitter-management" style={styles.link}>Babysitter Management</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/child-management" style={styles.link}>Child Management</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/financials" style={styles.link}>Financials</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/notifications" style={styles.link}>Notifications</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/reports" style={styles.link}>Reports</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/profile" style={styles.link}>Profile</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/" style={styles.link}>Logout</Link> {/* Redirects to Login for now */}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Manager Dashboard</h1>
        <p style={styles.subtitle}>Today’s Overview - April 03, 2025</p>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Children Present</h3>
            <p style={styles.cardValue}>{dailyStats.childrenPresent}</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Babysitters On Duty</h3>
            <p style={styles.cardValue}>{dailyStats.babysittersOnDuty}</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Daily Income</h3>
            <p style={styles.cardValue}>{dailyStats.totalIncome.toLocaleString()} UGX</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Daily Expenses</h3>
            <p style={styles.cardValue}>{dailyStats.totalExpenses.toLocaleString()} UGX</p>
          </div>
        </div>

        {/* Financial Summary */}
        <div style={styles.summarySection}>
          <h2 style={styles.sectionTitle}>Financial Summary</h2>
          <p style={styles.summaryText}>
            Net: {(dailyStats.totalIncome - dailyStats.totalExpenses).toLocaleString()} UGX | Transactions Today: {dailyStats.transactionsToday}
          </p>
          <div style={styles.budgetBar}>
            <div style={{ ...styles.budgetFill, width: '60%' }}></div> {/* Placeholder */}
          </div>
          <p style={styles.budgetLabel}>Budget Adherence: 60% Used</p>
        </div>

        {/* Alerts */}
        <div style={styles.alertsSection}>
          <h2 style={styles.sectionTitle}>Alerts</h2>
          <ul style={styles.alertList}>
            {alerts.map((alert) => (
              <li key={alert.id} style={styles.alertItem}>{alert.text}</li>
            ))}
          </ul>
        </div>

        {/* Quick Insights */}
        <div style={styles.chartSection}>
          <h2 style={styles.sectionTitle}>Quick Insights</h2>
          <p style={styles.placeholderText}>
            [Mini Chart: Spending Trends - Add Chart.js later]
          </p>
        </div>
      </div>
    </div>
  );
};

// Styling (Updated with link style)
const styles = {
  container: { display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f9e1e1, #d4e8f7)', fontFamily: "'Trebuchet MS', sans-serif" },
  sidebar: { width: '250px', backgroundColor: '#ff6f61', padding: '20px', color: '#fff', borderRight: '2px solid #ffd700' },
  sidebarTitle: { fontSize: '24px', marginBottom: '30px', fontWeight: 'bold' },
  navList: { listStyle: 'none', padding: 0 },
  navItem: { padding: '15px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease' },
  navItemActive: { padding: '15px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#e65b50' },
  link: { color: '#fff', textDecoration: 'none', display: 'block' }, // Added for Link styling
  mainContent: { flex: 1, padding: '40px' },
  title: { fontSize: '32px', color: '#ff6f61', marginBottom: '10px', fontWeight: 'bold' },
  subtitle: { fontSize: '16px', color: '#666', marginBottom: '30px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '2px solid #87ceeb', textAlign: 'center' },
  cardTitle: { fontSize: '18px', color: '#333', marginBottom: '10px' },
  cardValue: { fontSize: '24px', color: '#ff6f61', fontWeight: 'bold' },
  summarySection: { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', border: '2px solid #87ceeb', marginBottom: '40px' },
  sectionTitle: { fontSize: '24px', color: '#ff6f61', marginBottom: '15px' },
  summaryText: { fontSize: '16px', color: '#333', marginBottom: '10px' },
  budgetBar: { width: '100%', height: '10px', backgroundColor: '#eee', borderRadius: '5px', overflow: 'hidden' },
  budgetFill: { height: '100%', backgroundColor: '#ff6f61', transition: 'width 0.3s ease' },
  budgetLabel: { fontSize: '14px', color: '#666', marginTop: '5px' },
  alertsSection: { marginBottom: '40px' },
  alertList: { listStyle: 'none', padding: 0 },
  alertItem: { backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '10px', border: '2px solid #ffd700', color: '#333' },
  chartSection: { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', border: '2px solid #87ceeb' },
  placeholderText: { color: '#666', fontStyle: 'italic' },
};

export default Dashboard;