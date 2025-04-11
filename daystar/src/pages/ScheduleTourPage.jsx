// src/pages/ScheduleTourPage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ScheduleTourPage = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    tourDate: '',
    tourTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tour Schedule Request Submitted:', formData);
    alert('Tour request submitted successfully! We will confirm your appointment soon.');
    setFormData({
      parentName: '',
      parentPhone: '',
      tourDate: '',
      tourTime: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Schedule Tour Form Section */}
      <section className="py-12 px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Schedule a Tour</h1>
        <p className="text-center mb-6">
          Please provide your details and preferred time to visit Daystar Daycare Center. We’ll confirm your tour soon!
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* Parent's Name */}
          <div>
            <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
              Your Full Name
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
              Phone Number
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

          {/* Preferred Tour Date */}
          <div>
            <label htmlFor="tourDate" className="block text-sm font-medium text-gray-700">
              Preferred Tour Date
            </label>
            <input
              type="date"
              id="tourDate"
              name="tourDate"
              value={formData.tourDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]} // Disable past dates
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Preferred Tour Time */}
          <div>
            <label htmlFor="tourTime" className="block text-sm font-medium text-gray-700">
              Preferred Tour Time
            </label>
            <input
              type="time"
              id="tourTime"
              name="tourTime"
              value={formData.tourTime}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-block px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
            >
              Schedule Tour
            </button>
          </div>
        </form>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ScheduleTourPage;