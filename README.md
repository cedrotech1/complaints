# Claims Management System

A full-stack application for managing claims and complaints, built with React and Node.js. This system provides a comprehensive solution for submitting, tracking, and managing claims efficiently.
In few words, when system is used by system admin (hard coded in seeds file - superadmin@gmail.com password 1234) and users from different government agencies recorded by super admin and citizens who create account as normal.


## 📋 Project Overview

The Claims Management System is designed to streamline the process of handling citizen complaints and claims. It allows users to claim to different agencies and automatically all users on agency receive email and check your complaint and reply, reject, approve it and when do so citizen receive email automatically, each user added by admin receive email directly with their password, but I make it simple password for added user by default is 1234.

1. **Submit Claims**
   - Create new claims with detailed information
   - Track claim status in real-time
   - Receive email notifications for status updates

2. **Manage Claims**
   - View all submitted claims on gaverment agency
   - Filter and search through claims
   - Update claim status
   - Add comments and notes
   - Generate reports

3. **User Management**
   - Role-based access control
   - Secure authentication
   - User profile management

## 👥 User Roles and Access

### Default Admin User
- **Email**: superadmin@gmail.com
- **Password**: 1234
- **Role**: Administrator
- **Permissions**: Full system access, user management, agency management

### Regular Users (citizens)
- Created account (signup)
- Can submit and track their own claims
- Limited access to system features

### Staff Users on agency
- Created by administrators
- Can manage assigned claims
- Can update claim status
- Can communicate with claimants

## 🔐 Authentication and Security

- JWT-based authentication
- Password encryption
- Role-based access control

## 📝 Claim Process Flow

1. **Claim Submission**
   - User logs in to the system
   - Fills out claim form with details
   - Submits claim for review

2. **Claim Processing**
   - Staff reviews submitted claim
   - Updates claim status
   - Adds internal notes
   - Communicates with claimant

3. **Claim Resolution**
   - Final decision is made
   - Claimant is notified
   - Case is closed

## 🏗️ Project Structure

The project is divided into two main components:

### Frontend (`/frontend`)
A modern React-based user interface that provides:
- User-friendly claim submission interface
- Real-time claim status tracking
- Responsive design for all devices
- Toast notifications for user feedback

For detailed frontend documentation, see [Frontend README](./frontend/README.md)

### Backend (`/backend`)
A robust Node.js API that provides:
- User authentication and authorization (JWT)
- Complaint management system (CRUD)
- File upload support via Cloudinary
- Email notifications using SendGrid
- Swagger API documentation
- Database migrations and seeding

For detailed backend documentation, see [Backend README](./backend/README.md)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn package manager

### Production Links
- Frontend: [https://complaints-five.vercel.app/](https://complaints-five.vercel.app/)
- Backend documentation: [https://complaints-3h09.onrender.com/api/v1/docs](https://complaints-3h09.onrender.com/api/v1/docs)
- Backend application base url: [https://complaints-3h09.onrender.com]


### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will be available at `http://localhost:3000`

### Backend Setup
```bash
cd backend
npm install
# Create and configure .env file (see backend README for details)
npm run migrate
npm run seed
npm run start:dev
```
The backend API will be available at `http://localhost:8000`

## 🛠️ Tech Stack

### Frontend
- React 18.3.1
- React Router 6.23.1
- React Toastify 10.0.5
- React Scripts 5.0.1
- Testing Libraries (Jest, React Testing Library)

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Cloudinary (File Upload)
- SendGrid (Email Notifications)
- Swagger (API Documentation)

## 📚 Documentation

- Frontend documentation: [Frontend README](./frontend/README.md)
- Backend documentation: [Backend README](./backend/README.md)
- API Documentation: Available at `http://localhost:8000/api/v1/docs` when running the backend server


## 👥 Authors

- Cedrick hakuzimana - Initial work

## 🙏 Acknowledgments

- React team for the amazing framework
- Node.js community for the excellent tools and libraries 