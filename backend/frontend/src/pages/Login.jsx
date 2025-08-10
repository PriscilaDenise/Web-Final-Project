import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Select, SelectItem } from '@nextui-org/react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to authenticate
    // For now, we'll just redirect based on role
    switch (formData.role) {
      case 'parent':
        navigate('/parent/dashboard');
        break;
      case 'babysitter':
        navigate('/babysitter/dashboard');
        break;
      case 'manager':
        navigate('/manager/dashboard');
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <SelectItem key="parent" value="parent">Parent</SelectItem>
            <SelectItem key="babysitter" value="babysitter">Babysitter</SelectItem>
            <SelectItem key="manager" value="manager">Manager</SelectItem>
          </Select>
          <Button type="submit" color="primary" className="w-full">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login; 