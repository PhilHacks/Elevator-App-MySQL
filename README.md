# 🛗 Elevator-App-MySQL

## Table of Contents

- [Project Overview](#project-overview)
- [Installation and Setup](#installation-and-setup)
- [Project Features](#project-features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

### **Project Overview**

**Project Name:** ElevatorApp-MySQL

**Description:** ElevatorApp is a Node.js application for managing a network of elevators, leveraging MySQL for data storage. It offers API endpoints for calling elevators to specific floors, checking elevator availability, and tracking elevator status. The frontend, built with React, fully interacts with the functionalities of the backend.

### **Installation and Setup**

#### **Requirements:**

- Node.js
- npm (Node Package Manager)
- MySQL

#### **Installation:**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/PhilHacks/Elevator-App-MySQL.git
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd Elevator-App-MySQL
   ```
3. **Install the required Dependencies:**
   ```bash
   npm install
   ```

### **Database Initialization and Configuration**

Ensure your MySQL database is set up and configured before launching the application. Follow these steps to prepare your environment:

#### **Install MySQL:**

- Download the MySQL Community Server from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/). Select the version compatible with your OS and follow the installation instructions.
- **Important:** Take note of the MySQL root user's password during installation.


### **Database Initialization and Configuration**

To get your MySQL database up and running, configure your connection in the `dbConnect.js` file:

1. **Locate `dbConnect.js`:** Find this file in your project's backend directory.
2. **Edit Connection Details:** Update the MySQL connection settings as follows:
   
   ```javascript
   import mysql from "mysql2/promise";

   // MySQL database connection pool initialization.
   const pool = mysql.createPool({
     host: "localhost",
     user: "root",
     password: "<YOUR_DATABASE_PASSWORD>",
     database: "sql_elevators",
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0,
   });

   export default pool;
   ```
   Replace `<YOUR_DATABASE_PASSWORD>` with your MySQL root password. Confirm that the `host`, `user`, and `database` are correct for your setup.

3. **Save Your Changes:** After editing, save `dbConnect.js`.

#### **Initialize the Database:**

- Verify that your MySQL service is active. Then, use the script provided to initialize your database schema:
  ```bash
  npm run init_db
  ```

### **Launch the Application:**

With the database prepared, you'll need to start both the backend and frontend servers to get the application running fully.

#### **Start the Backend Server:**

1. **Navigate to the Backend Directory:**
   ```bash
   cd backend
   ```
2. **Start the Backend Server:**
   ```bash
   npm start
   ```
   - This will start the backend server. The backend API will now be accessible at `http://localhost:5000`.

#### **Start the Frontend Server:**

1. **Open a New Terminal Window:**
   - Ensure the backend server is running in its terminal window. Open a new terminal window for the frontend server.

2. **Navigate to the Frontend Directory:**
   ```bash
   cd ../frontend
   ```
   - Note: If you're starting from the project's root directory again, adjust the path accordingly.

3. **Start the Frontend Server:**
   ```bash
   npm start
   ```
   - This will start the frontend server and usually opens the application in your default web browser automatically. If not, you can manually navigate to the address provided in the terminal: `http://localhost:3000`.

### **Project Features**

This application offers several API endpoints for managing and tracking elevators:

- `POST /callElevator`                 - Call Elevator to floor
- `GET /elevator/status`               - Elevator Status of all elevators
- `GET/callqueue/`                     - Fetch Call Queue Table
- `GET/elevator/available/:elevatorId` - Check if specific elevator is available
- `PUT /updateElevatorStatus`          - Update Elevator Status

### **Project Structure**

The project is divided into two main parts: `backend` and `frontend`.

#### Backend

The backend codebase is located in the `backend` directory and it's structured as follows:

```
backend/
├── src/
│   ├── createdb.sql
│   ├── crudOperations.js
│   ├── databaseSetup.js
│   ├── dbConnect.js
│   ├── elevatorManager.js
│   └── routes.js
├── .gitignore
├── main.js
└── package.json
```

#### Frontend

The frontend codebase is located in the `frontend` directory and it's structured as follows:

```
frontend/
├── src/
│   ├── components/
│   │   ├── CallElevator.jsx
│   │   ├── CallQueue.jsx
│   │   ├── ElevatorStatus.jsx
│   │   ├── UpdateStatus.jsx
│   ├── services/
│   │   └── ElevatorServices.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── setupTests.js
├── .gitignore
├── README.md
├── package-lock.json
└── package.json
```

## Image of Elevator App

![Elevator App Interface](./backend/img/appUI.png)

### **Technologies Used**

- Backend: Node.js, Express.js, MySQL
- Frontend: React, Axios, Styled-Components.
