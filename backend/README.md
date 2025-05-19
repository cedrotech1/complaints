# Complaints API

A robust backend API for managing complaints, built with **Node.js**, **Express**, and **PostgreSQL**.

## 🚀 Features

* User authentication and authorization (JWT)
* Complaint management system (CRUD)
* File upload support via Cloudinary
* Email notifications using SendGrid
* Swagger API documentation
* Database migrations and seeding
* Environment-based configuration (development & production)

## 📋 Prerequisites

* Node.js (v14 or higher)
* PostgreSQL
* npm or yarn package manager

## 🔧 Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/cedrotech1/complaints.git
   cd complaints/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory with the following variables:**

   You can refer to the `.env.example` file included in the project.

   ```env
   # General
   PORT=8000
   NODE_ENV=development

   # Development Database
   DEV_DATABASE_NAME=claim_db
   DEV_DATABASE_USER=postgres
   DEV_DATABASE_PASSWORD=password
   DEV_DATABASE_HOST=localhost
   DEV_DATABASE_PORT=5432

   # Production Database
   PRO_DATABASE_NAME=claim_db
   PRO_DATABASE_USER=claiming_user
   PRO_DATABASE_PASSWORD=your_production_password
   PRO_DATABASE_HOST=password
   PRO_DATABASE_PORT=5432

   # JWT
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1d
   JWT_COOKIE_EXPIRES_IN=1

   # Cloudinary
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # SendGrid
   EMAIL_FROM=your_email@example.com
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

4. **Set up the database:**

   ```bash
   # Run migrations
   npm run migrate

   # Seed the database
   npm run seed
   ```

5. **Start the development server:**

   ```bash
   npm run start:dev
   ```

## 🛠️ Available Scripts

* `npm run start` – Start the production server
* `npm run start:dev` – Start the development server with hot reload
* `npm run start:prod` – Start the production server with nodemon
* `npm run build` – Build the project
* `npm run migrate` – Run database migrations
* `npm run seed` – Seed the database
* `npm run resetDev` – Reset development database (migrations + seeds)
* `npm run resetProd` – Reset production database (migrations + seeds)

## 📚 API Documentation

Once the server is running, visit the Swagger UI:

```
http://localhost:8000/api/v1/docs
```

## 📁 Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── database/       # Database models and migrations
├── documentation/  # API documentation
├── helper/         # Helper functions
├── middlewares/    # Custom middlewares
├── routers/        # API routes
├── services/       # Business logic
├── utils/          # Utility functions
├── views/          # View templates
├── app.js          # Express app configuration
└── index.js        # Application entry point
```

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication. Protected routes require a valid token:

```
Authorization: Bearer <your-token>
```

## 📧 Email Notifications

SendGrid is used to send emails. Ensure your SendGrid API key is configured correctly in the `.env` file.

## 📤 File Upload

Images or files are uploaded to **Cloudinary**. Set your Cloudinary credentials in the `.env` file to enable uploads.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the **ISC License**.

