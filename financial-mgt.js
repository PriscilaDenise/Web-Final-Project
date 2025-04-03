import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FinancialManagement = () => {
  // State for income/expense forms
  const [incomeForm, setIncomeForm] = useState({ amount: '', description: '' });
  const [expenseForm, setExpenseForm] = useState({ amount: '', category: '' });
  const [budgetForm, setBudgetForm] = useState({ category: '', amount: '' });

  // Placeholder data
  const [incomes, setIncomes] = useState([{ id: 1, amount: 50000, description: 'Parent A - Full-day', date: '2025-04-03' }]);
  const [expenses, setExpenses] = useState([{ id: 1, amount: 20000, category: 'Babysitter Salaries', date: '2025-04-03' }]);
  const [budgets, setBudgets] = useState([{ id: 1, category: 'Utilities', amount: 30000, used: 20000 }]);

  // Handle form submissions
  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    if (!incomeForm.amount || !incomeForm.description) return;
    setIncomes([...incomes, { id: Date.now(), ...incomeForm, date: '2025-04-03' }]);
    setIncomeForm({ amount: '', description: '' });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseForm.amount || !expenseForm.category) return;
    setExpenses([...expenses, { id: Date.now(), ...expenseForm, date: '2025-04-03' }]);
    setExpenseForm({ amount: '', category: '' });
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (!budgetForm.category || !budgetForm.amount) return;
    setBudgets([...budgets, { id: Date.now(), ...budgetForm, used: 0 }]);
    setBudgetForm({ category: '', amount: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Daystar Daycare</h2>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
          <li style={styles.navItem}><Link to="/babysitter-management" style={styles.link}>Babysitter Management</Link></li>
          <li style={styles.navItem}><Link to="/child-management" style={styles.link}>Child Management</Link></li>
          <li style={styles.navItemActive}><Link to="/financials" style={styles.link}>Financials</Link></li>
          <li style={styles.navItem}><Link to="/notifications" style={styles.link}>Notifications</Link></li>
          <li style={styles.navItem}><Link to="/reports" style={styles.link}>Reports</Link></li>
          <li style={styles.navItem}><Link to="/profile" style={styles.link}>Profile</Link></li>
          <li style={styles.navItem}><Link to="/" style={styles.link}>Logout</Link></li>
        </ul>
      </div>

      <div style={styles.mainContent}>
        <h1 style={styles.title}>Financial Management</h1>
        <p style={styles.subtitle}>Track finances - April 03, 2025</p>

        {/* Income Form */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Add Income</h2>
          <form onSubmit={handleIncomeSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Amount (UGX)</label>
              <input type="number" name="amount" value={incomeForm.amount} onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <input type="text" name="description" value={incomeForm.description} onChange={(e) => setIncomeForm({ ...incomeForm, description: e.target.value })} style={styles.input} />
            </div>
            <button type="submit" style={styles.submitButton}>Add Income</button>
          </form>
        </div>

        {/* Expense Form */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Add Expense</h2>
          <form onSubmit={handleExpenseSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Amount (UGX)</label>
              <input type="number" name="amount" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Category</label>
              <input type="text" name="category" value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} style={styles.input} />
            </div>
            <button type="submit" style={styles.submitButton}>Add Expense</button>
          </form>
        </div>

        {/* Budget Form */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Set Budget</h2>
          <form onSubmit={handleBudgetSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Category</label>
              <input type="text" name="category" value={budgetForm.category} onChange={(e) => setBudgetForm({ ...budgetForm, category: e.target.value })} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Amount (UGX)</label>
              <input type="number" name="amount" value={budgetForm.amount} onChange={(e) => setBudgetForm({ ...budgetForm, amount: e.target.value })} style={styles.input} />
            </div>
            <button type="submit" style={styles.submitButton}>Set Budget</button>
          </form>
        </div>

        {/* Financial Summary */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Financial Overview</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Amount (UGX)</th>
                <th style={styles.th}>Details</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((inc) => (
                <tr key={inc.id} style={styles.tr}>
                  <td style={styles.td}>Income</td>
                  <td style={styles.td}>{inc.amount.toLocaleString()}</td>
                  <td style={styles.td}>{inc.description}</td>
                  <td style={styles.td}>{inc.date}</td>
                </tr>
              ))}
              {expenses.map((exp) => (
                <tr key={exp.id} style={styles.tr}>
                  <td style={styles.td}>Expense</td>
                  <td style={styles.td}>{exp.amount.toLocaleString()}</td>
                  <td style={styles.td}>{exp.category}</td>
                  <td style={styles.td}>{exp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 style={styles.subSectionTitle}>Budgets</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Budget (UGX)</th>
                <th style={styles.th}>Used (UGX)</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((bud) => (
                <tr key={bud.id} style={styles.tr}>
                  <td style={styles.td}>{bud.category}</td>
                  <td style={styles.td}>{bud.amount.toLocaleString()}</td>
                  <td style={styles.td}>{bud.used.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
  subSectionTitle: { fontSize: '18px', color: '#ff6f61', marginTop: '20px', marginBottom: '10px' },
  form: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: { fontSize: '14px', color: '#333', marginBottom: '5px', fontWeight: 'bold' },
  input: { width: '100%', padding: '12px', fontSize: '16px', borderRadius: '10px', border: '2px solid #87ceeb', outline: 'none', boxSizing: 'border-box' },
  submitButton: { backgroundColor: '#ff6f61', color: '#fff', padding: '12px', fontSize: '18px', border: 'none', borderRadius: '10px', cursor: 'pointer', gridColumn: '1 / -1' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '15px', backgroundColor: '#ff6f61', color: '#fff', textAlign: 'left', borderBottom: '2px solid #ffd700' },
  td: { padding: '15px', borderBottom: '1px solid #eee', color: '#333' },
  tr: { transition: 'background-color 0.3s ease' },
};

export default FinancialManagement;