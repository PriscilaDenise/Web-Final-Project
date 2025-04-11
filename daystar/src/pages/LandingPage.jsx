// src/pages/LandingPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-blue-500 text-white py-16 px-4 text-center bg-opacity-90 bg-[url('/path-to-image.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Daystar Daycare Center</h1>
          <p className="text-lg md:text-xl mb-6">Nurturing Care and Early Learning for Your Little Ones</p>
          <p className="text-md mb-8">A safe, stimulating environment for children aged 0-5</p>
          <div className="space-x-4">
            <Button text="Enroll Now" to="/enroll" primary />
            <Button text="Schedule a Tour" to="/schedule-tour" />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Our Programs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Infant Care</h3>
            <p className="text-gray-700">Caring support for babies aged 0-2 with personalized attention.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Toddler Program</h3>
            <p className="text-gray-700">Engaging activities for children aged 2-3 to foster growth.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Preschool</h3>
            <p className="text-gray-700">Structured learning for ages 3-5 to prepare for school.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-gray-200">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">What Parents Say</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic">"Daystar has been a blessing for our family. The staff is caring and professional!"</p>
            <p className="mt-4 text-gray-600 font-semibold">- Sarah M., Parent</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic">"My child loves the preschool program—ready for school in no time!"</p>
            <p className="mt-4 text-gray-600 font-semibold">- James K., Parent</p>
          </div>
        </div>
      </section>

      {/* Trust Builders */}
      <section className="py-12 px-4 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Why Choose Us?</h2>
        <ul className="max-w-4xl mx-auto space-y-4 text-gray-700">
          <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Experienced and background-checked staff</li>
          <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Low child-to-staff ratio</li>
          <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Secure entry systems and safety protocols</li>
        </ul>
      </section>

      {/* Contact & Location */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-gray-700">
            <p><strong>Address:</strong> 123 Daystar Lane, Kampala, Uganda</p>
            <p><strong>Phone:</strong> <a href="tel:+256123456789" className="text-blue-500 hover:underline">+256 123 456 789</a></p>
            <p><strong>Email:</strong> <a href="mailto:info@daystardaycare.com" className="text-blue-500 hover:underline">info@daystardaycare.com</a></p>
          </div>
          <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center text-gray-500">
            Map Placeholder
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;