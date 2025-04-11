// src/pages/EnrollPage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

const EnrollPage = () => {
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    parentName: '',
    parentPhone: '',
    specialNeeds: '',
    sessionType: 'half-day',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending data to manager (replace with API call in future)
    console.log('Enrollment Form Submitted:', formData);
    alert('Enrollment request submitted successfully! The manager will review and notify you.');
    // Reset form
    setFormData({
      childName: '',
      childAge: '',
      parentName: '',
      parentPhone: '',
      specialNeeds: '',
      sessionType: 'half-day',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Enrollment Form Section */}
      <section className="py-12 px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Enroll Your Child</h1>
        <p className="text-center mb-6">
          Fill out the form below to request enrollment at Daystar Daycare Center. Our manager will review your application and get back to you soon!
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* Child's Full Name */}
          <div>
            <label htmlFor="childName" className="block text-sm font-medium text-gray-700">
              Child's Full Name
            </label>
            <input
              type="text"
              id="childName"
              name="childName"
              value={formData.childName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., John Doe"
            />
          </div>

          {/* Child's Age */}
          <div>
            <label htmlFor="childAge" className="block text-sm font-medium text-gray-700">
              Child's Age (in years)
            </label>
            <input
              type="number"
              id="childAge"
              name="childAge"
              value={formData.childAge}
              onChange={handleChange}
              min="0"
              max="5"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 3"
            />
          </div>

          {/* Parent's Name */}
          <div>
            <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
              Parent/Guardian Full Name
            </label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Jane Doe"
            />
          </div>

          {/* Parent's Phone */}
          <div>
            <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700">
              Parent/Guardian Phone Number
            </label>
            <input
              type="tel"
              id="parentPhone"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., +256 123 456 789"
            />
          </div>

          {/* Special Care Needs */}
          <div>
            <label htmlFor="specialNeeds" className="block text-sm font-medium text-gray-700">
              Special Care Needs (e.g., allergies, medical conditions)
            </label>
            <textarea
              id="specialNeeds"
              name="specialNeeds"
              value={formData.specialNeeds}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Nut allergy, requires medication"
              rows="3"
            />
          </div>

          {/* Session Type */}
          <div>
            <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700">
              Session Type
            </label>
            <select
              id="sessionType"
              name="sessionType"
              value={formData.sessionType}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="half-day">Half-Day (2,000K)</option>
              <option value="full-day">Full-Day (5,000K)</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-block px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
            >
              Submit Enrollment
            </button>
          </div>
        </form>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EnrollPage;