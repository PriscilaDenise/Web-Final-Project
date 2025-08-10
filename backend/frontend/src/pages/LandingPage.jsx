import { Button, Card, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { FaChild, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <h1 className="text-5xl font-bold mb-4">Nurturing Care and Early Learning for Your Little Ones</h1>
              <p className="text-xl mb-8">Where every child's journey begins with love, learning, and laughter</p>
              <div className="flex gap-4">
                <Button as={Link} to="/enroll" color="primary" size="lg">
                  Enroll Now
                </Button>
                <Button as={Link} to="/schedule-tour" color="secondary" size="lg">
                  Schedule a Tour
                </Button>
              </div>
            </div>
            <div className="w-1/2">
              <Image
                src="/images/daycare-hero.jpg"
                alt="Happy children at daycare"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          <div className="grid grid-cols-3 gap-8">
            <Card className="p-6">
              <FaChild className="text-4xl mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Infant Care</h3>
              <p>Specialized care for babies 6 weeks to 12 months</p>
            </Card>
            <Card className="p-6">
              <FaChild className="text-4xl mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Toddler Program</h3>
              <p>Engaging activities for children 1-3 years</p>
            </Card>
            <Card className="p-6">
              <FaChild className="text-4xl mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Preschool</h3>
              <p>Early learning for children 3-5 years</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Experienced Staff</h3>
              <p>Our team consists of certified early childhood educators with years of experience</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Safe Environment</h3>
              <p>Secure facilities with 24/7 monitoring and emergency procedures</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Nutritious Meals</h3>
              <p>Healthy, balanced meals prepared by our in-house nutritionist</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Learning Through Play</h3>
              <p>Developmentally appropriate activities that make learning fun</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-2xl mr-4 text-blue-500" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p>123 Daycare Street, City, State 12345</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-2xl mr-4 text-blue-500" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>(123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-2xl mr-4 text-blue-500" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>info@daycarecenter.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 