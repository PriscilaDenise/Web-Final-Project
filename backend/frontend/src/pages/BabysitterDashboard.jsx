import { useState } from 'react';
import { Card, Button, Table, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { FaUser, FaCalendarAlt, FaClipboardList, FaLock, FaExclamationTriangle } from 'react-icons/fa';

const BabysitterDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [schedule, setSchedule] = useState([
    { id: 1, date: '2024-03-20', time: '9:00 AM - 5:00 PM', room: 'Preschool Room' },
    { id: 2, date: '2024-03-21', time: '9:00 AM - 5:00 PM', room: 'Toddler Room' }
  ]);

  const [attendance, setAttendance] = useState([
    { id: 1, childName: 'John Doe', status: 'Present', checkIn: '9:00 AM', checkOut: '5:00 PM' },
    { id: 2, childName: 'Jane Doe', status: 'Present', checkIn: '9:15 AM', checkOut: '5:00 PM' }
  ]);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Today's Schedule</h3>
          <Table>
            <Table.Header>
              <Table.Column>Date</Table.Column>
              <Table.Column>Time</Table.Column>
              <Table.Column>Room</Table.Column>
            </Table.Header>
            <Table.Body>
              {schedule.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.date}</Table.Cell>
                  <Table.Cell>{item.time}</Table.Cell>
                  <Table.Cell>{item.room}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Today's Attendance</h3>
          <Table>
            <Table.Header>
              <Table.Column>Child</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Check In/Out</Table.Column>
            </Table.Header>
            <Table.Body>
              {attendance.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.childName}</Table.Cell>
                  <Table.Cell>{item.status}</Table.Cell>
                  <Table.Cell>{item.checkIn} / {item.checkOut}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      </div>
    </div>
  );

  const renderProfile = () => (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
      <div className="space-y-4">
        <Input label="Name" value="Sarah Babysitter" />
        <Input label="Email" value="sarah@example.com" />
        <Input label="Phone" value="(123) 456-7890" />
        <Input label="Address" value="123 Main St, City, State" />
        <Button color="primary">Update Profile</Button>
      </div>
    </Card>
  );

  const renderSchedule = () => (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Weekly Schedule</h3>
      <Table>
        <Table.Header>
          <Table.Column>Date</Table.Column>
          <Table.Column>Time</Table.Column>
          <Table.Column>Room</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          {schedule.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell>{item.time}</Table.Cell>
              <Table.Cell>{item.room}</Table.Cell>
              <Table.Cell>
                <Button size="sm" color="success">Confirmed</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );

  const renderDailyReport = () => (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Daily Reports</h3>
        <Button color="primary" onPress={onOpen}>Create New Report</Button>
      </div>
      <Table>
        <Table.Header>
          <Table.Column>Date</Table.Column>
          <Table.Column>Room</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>2024-03-19</Table.Cell>
            <Table.Cell>Preschool Room</Table.Cell>
            <Table.Cell>Submitted</Table.Cell>
            <Table.Cell>
              <Button size="sm" color="primary">View</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Card>
  );

  const renderIncidentReport = () => (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Incident Reports</h3>
        <Button color="primary" onPress={onOpen}>Report Incident</Button>
      </div>
      <Table>
        <Table.Header>
          <Table.Column>Date</Table.Column>
          <Table.Column>Child</Table.Column>
          <Table.Column>Type</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>2024-03-19</Table.Cell>
            <Table.Cell>John Doe</Table.Cell>
            <Table.Cell>Minor Injury</Table.Cell>
            <Table.Cell>
              <Button size="sm" color="warning">Pending</Button>
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
            <FaCalendarAlt className="mr-2" /> Dashboard
          </Button>
          <Button
            color={activeTab === 'profile' ? 'primary' : 'default'}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="mr-2" /> Profile
          </Button>
          <Button
            color={activeTab === 'schedule' ? 'primary' : 'default'}
            onClick={() => setActiveTab('schedule')}
          >
            <FaCalendarAlt className="mr-2" /> Schedule
          </Button>
          <Button
            color={activeTab === 'reports' ? 'primary' : 'default'}
            onClick={() => setActiveTab('reports')}
          >
            <FaClipboardList className="mr-2" /> Daily Reports
          </Button>
          <Button
            color={activeTab === 'incidents' ? 'primary' : 'default'}
            onClick={() => setActiveTab('incidents')}
          >
            <FaExclamationTriangle className="mr-2" /> Incidents
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
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'reports' && renderDailyReport()}
        {activeTab === 'incidents' && renderIncidentReport()}
        {activeTab === 'password' && renderChangePassword()}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>Create New Report</ModalHeader>
            <ModalBody>
              <Input label="Date" type="date" />
              <Input label="Room" />
              <Input label="Number of Children" type="number" />
              <Input label="Activities" />
              <Input label="Notes" />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Submit Report
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default BabysitterDashboard; 