import { useState } from 'react';
import { Card, Button, Table, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { FaUser, FaChild, FaMoneyBillWave, FaCalendarAlt, FaChartLine, FaLock } from 'react-icons/fa';

const ManagerDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [babysitters, setBabysitters] = useState([
    { id: 1, name: 'Sarah Johnson', position: 'Lead Teacher', status: 'Active', salary: '$3000' },
    { id: 2, name: 'Mike Smith', position: 'Assistant Teacher', status: 'Active', salary: '$2500' }
  ]);

  const [children, setChildren] = useState([
    { id: 1, name: 'John Doe', age: 3, program: 'Preschool', parent: 'Jane Doe' },
    { id: 2, name: 'Jane Smith', age: 2, program: 'Toddler Program', parent: 'John Smith' }
  ]);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Staff Overview</h3>
          <p className="text-3xl font-bold mb-2">{babysitters.length}</p>
          <p>Active Staff Members</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Children Enrolled</h3>
          <p className="text-3xl font-bold mb-2">{children.length}</p>
          <p>Total Children</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Monthly Revenue</h3>
          <p className="text-3xl font-bold mb-2">$25,000</p>
          <p>Current Month</p>
        </Card>
      </div>
    </div>
  );

  const renderBabysitterManagement = () => (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Staff Management</h3>
        <Button color="primary" onPress={onOpen}>Add New Staff</Button>
      </div>
      <Table>
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Position</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Salary</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {babysitters.map(babysitter => (
            <Table.Row key={babysitter.id}>
              <Table.Cell>{babysitter.name}</Table.Cell>
              <Table.Cell>{babysitter.position}</Table.Cell>
              <Table.Cell>{babysitter.status}</Table.Cell>
              <Table.Cell>{babysitter.salary}</Table.Cell>
              <Table.Cell>
                <Button size="sm" color="primary">Edit</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );

  const renderChildManagement = () => (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Child Management</h3>
        <Button color="primary" onPress={onOpen}>Add New Child</Button>
      </div>
      <Table>
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Age</Table.Column>
          <Table.Column>Program</Table.Column>
          <Table.Column>Parent</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {children.map(child => (
            <Table.Row key={child.id}>
              <Table.Cell>{child.name}</Table.Cell>
              <Table.Cell>{child.age}</Table.Cell>
              <Table.Cell>{child.program}</Table.Cell>
              <Table.Cell>{child.parent}</Table.Cell>
              <Table.Cell>
                <Button size="sm" color="primary">Edit</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );

  const renderFinancialManagement = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Income Tracking</h3>
        <Table>
          <Table.Header>
            <Table.Column>Date</Table.Column>
            <Table.Column>Source</Table.Column>
            <Table.Column>Amount</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>2024-03-01</Table.Cell>
              <Table.Cell>Monthly Tuition</Table.Cell>
              <Table.Cell>$500.00</Table.Cell>
              <Table.Cell>Paid</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Expense Tracking</h3>
        <Table>
          <Table.Header>
            <Table.Column>Date</Table.Column>
            <Table.Column>Category</Table.Column>
            <Table.Column>Amount</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>2024-03-15</Table.Cell>
              <Table.Cell>Salaries</Table.Cell>
              <Table.Cell>$5,500.00</Table.Cell>
              <Table.Cell>Paid</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Budget Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Monthly Budget</p>
            <p className="text-2xl">$20,000</p>
          </div>
          <div>
            <p className="font-semibold">Current Spending</p>
            <p className="text-2xl">$15,000</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderChangePassword = () => (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Change Password</h3>
      <div className="space-y-4">
        <Input label="Current Password" type="password" />
        <Input label="New Password" type="password" />
        <Input label="Confirm New Password" type="password" />
        <Button color="primary">Update Password</Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <Button
            color={activeTab === 'dashboard' ? 'primary' : 'default'}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartLine className="mr-2" /> Dashboard
          </Button>
          <Button
            color={activeTab === 'staff' ? 'primary' : 'default'}
            onClick={() => setActiveTab('staff')}
          >
            <FaUser className="mr-2" /> Staff Management
          </Button>
          <Button
            color={activeTab === 'children' ? 'primary' : 'default'}
            onClick={() => setActiveTab('children')}
          >
            <FaChild className="mr-2" /> Child Management
          </Button>
          <Button
            color={activeTab === 'finance' ? 'primary' : 'default'}
            onClick={() => setActiveTab('finance')}
          >
            <FaMoneyBillWave className="mr-2" /> Financial Management
          </Button>
          <Button
            color={activeTab === 'password' ? 'primary' : 'default'}
            onClick={() => setActiveTab('password')}
          >
            <FaLock className="mr-2" /> Change Password
          </Button>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'staff' && renderBabysitterManagement()}
        {activeTab === 'children' && renderChildManagement()}
        {activeTab === 'finance' && renderFinancialManagement()}
        {activeTab === 'password' && renderChangePassword()}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>Add New Staff Member</ModalHeader>
            <ModalBody>
              <Input label="Name" />
              <Input label="Email" type="email" />
              <Input label="Phone" />
              <Input label="Position" />
              <Input label="Salary" />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Add Staff
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default ManagerDashboard; 