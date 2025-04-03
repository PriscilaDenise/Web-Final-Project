import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MainDashboard = () => {
  // State for contact forms
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setFormStatus('Please fill in all fields.');
      return;
    }
    setFormStatus('Thank you! Your message has been sent.');
    setContactForm({ name: '', email: '', message: '' });
    // Later: Send to backend (e.g., fetch('/api/contact', { method: 'POST', ... }))
  };

  // Placeholder testimonials
  const testimonials = [
    { id: 1, name: 'Grace N.', text: 'Daystar has been a blessing for my son. The staff are caring and attentive!' },
    { id: 2, name: 'Peter M.', text: 'I love the daily updates and the safe environment they provide.' },
    { id: 3, name: 'Aisha K.', text: 'Perfect for working parents. My daughter is thriving here!' },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to Daystar Daycare</h1>
        <p style={styles.subtitle}>A Safe, Fun, and Nurturing Environment for Your Child</p>
        <Link to="/login" style={styles.loginButton}>Staff Login</Link>
      </header>

      {/* Services Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.servicesGrid}>
          <div style={styles.serviceCard}>
            <h3 style={styles.cardTitle}>Half-Day Care</h3>
            <p style={styles.cardText}>Flexible 4-hour sessions for ages 1-5.</p>
          </div>
          <div style={styles.serviceCard}>
            <h3 style={styles.cardTitle}>Full-Day Care</h3>
            <p style={styles.cardText}>Comprehensive care from 8 AM to 5 PM.</p>
          </div>
          <div style={styles.serviceCard}>
            <h3 style={styles.cardTitle}>Special Needs Support</h3>
            <p style={styles.cardText}>Personalized care for every child’s needs.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>About Us</h2>
        <p style={styles.aboutText}>
          At Daystar Daycare, we believe in fostering growth through play, learning, and love. Our dedicated team ensures your child thrives in a secure and joyful setting. Established under Uganda Christian University’s community outreach, we’re committed to excellence in childcare.
        </p>
      </section>

      {/* Testimonials Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What Parents Say</h2>
        <div style={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} style={styles.testimonialCard}>
              <p style={styles.testimonialText}>“{testimonial.text}”</p>
              <p style={styles.testimonialName}>- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Get in Touch</h2>
        <div style={styles.contactContainer}>
          <div style={styles.contactInfo}>
            <p style={styles.contactText}>Phone: +256 771 234 567</p>
            <p style={styles.contactText}>Email: info@daystardaycare.org</p>
            <p style={styles.contactText}>Address: Plot 12, Mukono Hill, Uganda</p>
          </div>
          <form onSubmit={handleContactSubmit} style={styles.contactForm}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                style={styles.input}
                placeholder="Your Name"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                style={styles.input}
                placeholder="Your Email"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                style={styles.textarea}
                placeholder="Your Message"
              />
            </div>
            {formStatus && <p style={formStatus.includes('Thank') ? styles.success : styles.error}>{formStatus}</p>}
            <button type="submit" style={styles.submitButton}>Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2025 Daystar Daycare. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Creative Styling
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f9e1e1, #d4e8f7)',
    fontFamily: "'Trebuchet MS', sans-serif",
    color: '#333',
  },
  header: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#ff6f61',
    color: '#fff',
    borderBottom: '4px solid #ffd700',
  },
  title: {
    fontSize: '48px',
    marginBottom: '10px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  subtitle: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  loginButton: {
    display: 'inline-block',
    padding: '12px 25px',
    backgroundColor: '#87ceeb',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
  },
  section: {
    padding: '40px 20px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '32px',
    color: '#ff6f61',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '15px',
    border: '2px solid #87ceeb',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '22px',
    color: '#ff6f61',
    marginBottom: '10px',
  },
  cardText: {
    fontSize: '16px',
    color: '#666',
  },
  aboutText: {
    fontSize: '18px',
    maxWidth: '800px',
    margin: '0 auto',
    color: '#333',
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  testimonialCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '15px',
    border: '2px solid #ffd700',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  testimonialText: {
    fontSize: '16px',
    color: '#333',
    fontStyle: 'italic',
    marginBottom: '10px',
  },
  testimonialName: {
    fontSize: '14px',
    color: '#ff6f61',
    fontWeight: 'bold',
  },
  contactContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  contactInfo: {
    flex: '1',
    minWidth: '250px',
    textAlign: 'left',
  },
  contactText: {
    fontSize: '16px',
    color: '#666',
    margin: '10px 0',
  },
  contactForm: {
    flex: '1',
    minWidth: '300px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '15px',
    border: '2px solid #87ceeb',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '2px solid #87ceeb',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '2px solid #87ceeb',
    outline: 'none',
    minHeight: '100px',
    boxSizing: 'border-box',
  },
  success: {
    color: '#28a745',
    fontSize: '14px',
    marginBottom: '10px',
  },
  error: {
    color: '#ff4444',
    fontSize: '14px',
    marginBottom: '10px',
  },
  submitButton: {
    backgroundColor: '#ff6f61',
    color: '#fff',
    padding: '12px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    width: '100%',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#ff6f61',
    color: '#fff',
    borderTop: '2px solid #ffd700',
  },
  footerText: {
    fontSize: '14px',
  },
};

export default MainDashboard;