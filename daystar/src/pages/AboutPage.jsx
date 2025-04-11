// src/pages/AboutPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <section className="py-12 px-4 max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">About Daystar Daycare Center</h1>
        <div className="space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            Welcome to Daystar Daycare Center, where we provide exceptional care and education for children aged 0-5. Our facility is designed to be a second home, fostering growth and happiness.
          </p>
          <h2 className="text-2xl font-semibold mt-6 text-gray-800">Our Mission</h2>
          <p className="leading-relaxed">
            We are committed to nurturing young minds through play, learning, and love, ensuring every child feels safe and valued.
          </p>
          <h2 className="text-2xl font-semibold mt-6 text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Mary Smith</h3>
              <p className="text-gray-600">Lead Caregiver</p>
              <p className="mt-2 text-gray-700">With 10 years of experience, Mary ensures every child thrives.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Jane Okello</h3>
              <p className="text-gray-600">Program Director</p>
              <p className="mt-2 text-gray-700">Jane designs our engaging curriculum for all ages.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;