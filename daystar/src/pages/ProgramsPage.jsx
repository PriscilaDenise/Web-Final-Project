// src/pages/ProgramsPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProgramsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">Our Programs</h1>
        <p className="text-center text-lg text-gray-700 mb-12 leading-relaxed">
          Discover our carefully designed programs for children aged 0-5, tailored to their unique developmental stages.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-4 text-blue-500">👶</div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Infant Care</h2>
            <p className="text-gray-600 mb-2"><strong>Ages:</strong> 0-2 years</p>
            <p className="text-gray-600 mb-4"><strong>Price:</strong> 2,000K (Half-Day) / 5,000K (Full-Day)</p>
            <p className="text-gray-700">Gentle care with sensory play and routines.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-4 text-blue-500">🚶‍♂️</div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Toddler Program</h2>
            <p className="text-gray-600 mb-2"><strong>Ages:</strong> 2-3 years</p>
            <p className="text-gray-600 mb-4"><strong>Price:</strong> 2,000K (Half-Day) / 5,000K (Full-Day)</p>
            <p className="text-gray-700">Play-based learning for active toddlers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-4 text-blue-500">📚</div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Preschool</h2>
            <p className="text-gray-600 mb-2"><strong>Ages:</strong> 3-5 years</p>
            <p className="text-gray-600 mb-4"><strong>Price:</strong> 2,000K (Half-Day) / 5,000K (Full-Day)</p>
            <p className="text-gray-700">Structured prep for school success.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <a
            href="/enroll"
            className="inline-block px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105"
          >
            Enroll Now
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProgramsPage;