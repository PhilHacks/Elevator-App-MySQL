# 🛗 Elevator-App-MySQL

## ElevatorApp

## Table of Contents

- [Project Overview](#1-project-overview)
- [Installation and Setup](#2-installation-and-setup)
- [Project Features](#3-project-features)
- [Project Structure](#4-project-structure)
- [Technologies Used](#5-technologies-used)

### **1. Project Overview**

- **Project Name:** ElevatorApp
- **Description:** ElevatorApp is a Node.js application for managing a network of elevators. It provides API endpoints for calling elevators to specific floors, checking elevator availability, and tracking elevator status. This version uses MySQL to store data and has a React frontend that calls endpoints.

### **2. Installation and Setup**

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

#### **Configure Database Connection:**

1. **Create a `.env` File:**

   - In the root directory of your project, create a `.env` file. This file will securely store your database connection details, keeping them out of version control.

2. **Populate `.env` with MySQL Details:**

   - Fill in the `.env` file with your MySQL connection information. Ensure to replace `your_root_password` with the actual password set during MySQL installation:
     ```plaintext
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=your_root_password
     DB_NAME=sql_elevators
     ```

3. **Integration with `dbConnect.js`:**
   - The `.env` file's values are imported into the `dbConnect.js` script to establish the database connection, safeguarding your sensitive details.

#### **Initialize the Database:**

- Verify that your MySQL service is active. Then, use the script provided to initialize your database schema:
  ```bash
  npm run init_db
  ```

#### **Launch the Application:**

- With the database prepared, start the application server:
  ```bash
  npm start
  ```
- The API will now be accessible at `http://localhost:3000`.

### **3. Project Features**

This application offers several API endpoints for managing and tracking elevators:

- **Call Elevator**:
  - **Endpoint**: `/callElevator`
  - **Method**: POST
  - **Description**: Request an elevator to a specified floor. Include the desired floor in the request body as `{ "floor": number }`.
- **Elevator Status**:

  - **Endpoint**: `/elevator/status`
  - **Method**: GET
  - **Description**: Get the status of all elevators, including their current floor and availability.

- **Call Queue Table**:

  - **Endpoint**: `/callqueue/table`
  - **Method**: GET
  - **Description**: View the current call queue, showing which floors have pending elevator calls.

- **Check Elevator Availability**:
  - **Endpoint**: `/elevator/available/:elevatorId`
  - **Method**: GET
  - **Description**: Check if a specific elevator is available by providing the elevator ID in the URL.

### **4. Project Structure**

The project is divided into two main parts: `backend` and `frontend`.

## Backend

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

## Frontend

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

### **5. Technologies Used**

- Backend: Node.js, Express.js, MySQL
- Frontend: React, Axios
