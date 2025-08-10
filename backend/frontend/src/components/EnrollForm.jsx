import { useState } from 'react';
import { Card, Input, Button, Select, SelectItem, Textarea } from '@nextui-org/react';

const EnrollForm = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    childName: '',
    childAge: '',
    childGender: '',
    program: '',
    startDate: '',
    specialNeeds: '',
    additionalInfo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the enrollment
    console.log('Enrollment submitted:', formData);
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
          <h2 className="text-3xl font-bold text-center mb-8">Enroll Your Child</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Parent's Name"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                required
              />
              <Input
                label="Phone Number"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                required
              />
              <Input
                label="Child's Name"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                required
              />
              <Input
                label="Child's Age"
                type="number"
                name="childAge"
                value={formData.childAge}
                onChange={handleChange}
                required
              />
              <Select
                label="Child's Gender"
                name="childGender"
                value={formData.childGender}
                onChange={handleChange}
                required
              >
                <SelectItem key="male" value="male">Male</SelectItem>
                <SelectItem key="female" value="female">Female</SelectItem>
                <SelectItem key="other" value="other">Other</SelectItem>
              </Select>
              <Select
                label="Program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
              >
                <SelectItem key="infant" value="infant">Infant Care</SelectItem>
                <SelectItem key="toddler" value="toddler">Toddler Program</SelectItem>
                <SelectItem key="preschool" value="preschool">Preschool</SelectItem>
              </Select>
              <Input
                label="Preferred Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <Input
              label="Special Needs or Allergies"
              name="specialNeeds"
              value={formData.specialNeeds}
              onChange={handleChange}
            />
            <Textarea
              label="Additional Information"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
            />
            <Button type="submit" color="primary" className="w-full">
              Submit Enrollment
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EnrollForm; 