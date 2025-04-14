# Daycare Management System

A comprehensive web-based management system for daycare centers, built with React, Node.js, and MySQL.

## Features

### User Management
- Role-based access control (Manager, Parent, Babysitter)
- User registration and authentication
- Profile management
- Secure password handling

### Child Management
- Child registration and information tracking
- Parent-child relationship management
- Emergency contact information
- Special needs and allergy tracking

### Babysitter Management
- Babysitter registration and profiles
- Schedule management
- Attendance tracking
- Performance monitoring

### Attendance System
- Daily check-in/check-out tracking
- Attendance status monitoring
- Automated notifications
- Attendance reports

### Incident Management
- Incident reporting and tracking
- Multiple incident types (Injury, Illness, Behavioral)
- Action tracking and follow-up
- Manager review system

### Payment System
- Payment tracking and management
- Multiple payment methods support
- Payment status monitoring
- Receipt generation

### Budget Management
- Financial tracking
- Expense management
- Revenue monitoring
- Budget reports

### Notification System
- Real-time notifications
- Role-based notification delivery
- Notification history
- Email integration

## Tech Stack

### Frontend
- React.js
- Material-UI
- React Router
- Axios
- Formik & Yup

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../daystar
npm install
```

3. Set up the database:
- Create a MySQL database
- Update the database configuration in `server/config/database.js`

4. Set up environment variables:
Create a `.env` file in the server directory with:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

5. Run database migrations:
```bash
cd server
npx sequelize-cli db:migrate
```

## Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd daystar
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
daystar/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── App.jsx
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
└── index.js
```

## API Documentation

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user profile

### Users
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

### Children
- GET /api/children - Get all children
- POST /api/children - Create new child
- GET /api/children/:id - Get child by ID
- PUT /api/children/:id - Update child
- DELETE /api/children/:id - Delete child

### Babysitters
- GET /api/babysitters - Get all babysitters
- POST /api/babysitters - Create new babysitter
- GET /api/babysitters/:id - Get babysitter by ID
- PUT /api/babysitters/:id - Update babysitter
- DELETE /api/babysitters/:id - Delete babysitter

### Attendance
- GET /api/attendance - Get all attendance records
- POST /api/attendance - Create new attendance record
- PUT /api/attendance/:id - Update attendance record
- DELETE /api/attendance/:id - Delete attendance record

### Incidents
- GET /api/incidents - Get all incidents
- POST /api/incidents - Create new incident
- PUT /api/incidents/:id - Update incident
- DELETE /api/incidents/:id - Delete incident

### Payments
- GET /api/payments - Get all payments
- POST /api/payments - Create new payment
- PUT /api/payments/:id - Update payment
- DELETE /api/payments/:id - Delete payment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any queries or support, please contact:
- Email: [oscarodongkara@gmail.com]
- Project Link: [https://github.com/PriscilaDenise/Web-Final-Project] 
