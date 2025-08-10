import { useState } from 'react';
import { Card, Input, Button, Select, SelectItem } from '@nextui-org/react';

const ScheduleTour = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    numberOfChildren: '',
    programInterest: '',
    additionalNotes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to schedule the tour
    console.log('Tour scheduled:', formData);
    // Redirect to confirmation page or show success message
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Schedule a Tour</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Input
                label="Number of Children"
                type="number"
                name="numberOfChildren"
                value={formData.numberOfChildren}
                onChange={handleChange}
                required
              />
              <Input
                label="Preferred Date"
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
              />
              <Select
                label="Preferred Time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
              >
                <SelectItem key="morning" value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                <SelectItem key="afternoon" value="afternoon">Afternoon (1:00 PM - 4:00 PM)</SelectItem>
              </Select>
              <Select
                label="Program Interest"
                name="programInterest"
                value={formData.programInterest}
                onChange={handleChange}
                required
              >
                <SelectItem key="infant" value="infant">Infant Care</SelectItem>
                <SelectItem key="toddler" value="toddler">Toddler Program</SelectItem>
                <SelectItem key="preschool" value="preschool">Preschool</SelectItem>
              </Select>
            </div>
            <Input
              label="Additional Notes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
            />
            <Button type="submit" color="primary" className="w-full">
              Schedule Tour
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleTour; 