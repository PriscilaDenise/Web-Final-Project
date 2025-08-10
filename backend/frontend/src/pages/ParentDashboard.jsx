import { useState } from 'react';
import { Card, Button, Table, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { FaBell, FaUser, FaChild, FaHistory, FaLock } from 'react-icons/fa';

const ParentDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [children, setChildren] = useState([
    { id: 1, name: 'John Doe', age: 3, program: 'Preschool', attendance: 'Present' },
    { id: 2, name: 'Jane Doe', age: 1, program: 'Toddler Program', attendance: 'Present' }
  ]);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Notifications</h3>
          <div className="space-y-2">
            <p>• Upcoming parent-teacher meeting on Friday</p>
            <p>• New activity schedule posted</p>
            <p>• Payment reminder for next month</p>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Children's Status</h3>
          <Table>
            <Table.Header>
              <Table.Column>Name</Table.Column>
              <Table.Column>Status</Table.Column>
            </Table.Header>
            <Table.Body>
              {children.map(child => (
                <Table.Row key={child.id}>
                  <Table.Cell>{child.name}</Table.Cell>
                  <Table.Cell>{child.attendance}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button color="primary" className="w-full">View Payment History</Button>
            <Button color="secondary" className="w-full">Update Child Information</Button>
            <Button color="success" className="w-full">Schedule Absence</Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderProfile = () => (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
      <div className="space-y-4">
        <Input label="Name" value="John Parent" />
        <Input label="Email" value="john@example.com" />
        <Input label="Phone" value="(123) 456-7890" />
        <Input label="Address" value="123 Main St, City, State" />
        <Button color="primary">Update Profile</Button>
      </div>
    </Card>
  );

  const renderChildren = () => (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Children's Information</h3>
        <Button color="primary" onPress={onOpen}>Add Child</Button>
      </div>
      <Table>
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Age</Table.Column>
          <Table.Column>Program</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {children.map(child => (
            <Table.Row key={child.id}>
              <Table.Cell>{child.name}</Table.Cell>
              <Table.Cell>{child.age}</Table.Cell>
              <Table.Cell>{child.program}</Table.Cell>
              <Table.Cell>
                <Button size="sm" color="primary">Edit</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );

  const renderPaymentHistory = () => (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Payment History</h3>
      <Table>
        <Table.Header>
          <Table.Column>Date</Table.Column>
          <Table.Column>Amount</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Invoice</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>2024-03-01</Table.Cell>
            <Table.Cell>$500.00</Table.Cell>
            <Table.Cell>Paid</Table.Cell>
            <Table.Cell>
              <Button size="sm" color="primary">Download</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Card>
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
            <FaBell className="mr-2" /> Dashboard
          </Button>
          <Button
            color={activeTab === 'profile' ? 'primary' : 'default'}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="mr-2" /> Profile
          </Button>
          <Button
            color={activeTab === 'children' ? 'primary' : 'default'}
            onClick={() => setActiveTab('children')}
          >
            <FaChild className="mr-2" /> Children
          </Button>
          <Button
            color={activeTab === 'payments' ? 'primary' : 'default'}
            onClick={() => setActiveTab('payments')}
          >
            <FaHistory className="mr-2" /> Payments
          </Button>
          <Button
            color={activeTab === 'password' ? 'primary' : 'default'}
            onClick={() => setActiveTab('password')}
          >
            <FaLock className="mr-2" /> Change Password
          </Button>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'children' && renderChildren()}
        {activeTab === 'payments' && renderPaymentHistory()}
        {activeTab === 'password' && renderChangePassword()}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>Add New Child</ModalHeader>
            <ModalBody>
              <Input label="Child's Name" />
              <Input label="Age" type="number" />
              <Input label="Program" />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Add Child
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default ParentDashboard; 