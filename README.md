# 🛗Elevator-App-MySQL

## ElevatorApp

## Table of Contents

- [Project Overview](#1-project-overview)
- [Installation and Setup](#2-installation-and-setup)
- [Project Features](#3-project-features)
- [Project Structure](#4-project-structure)
- [Technologies Used](#5-technologies-used)
- [Testing Endpoints with Postman](#6-testing-endpoints-with-postman)

### **1. Project Overview**

- **Project Name:** ElevatorApp
- **Description:** ElevatorApp is a Node.js application for managing a network of elevators. It provides API endpoints for calling elevators to specific floors, checking elevator availability, and tracking elevator status. This version uses MySQL to store data

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

To test these endpoints, you can use the provided Postman collection, see [Testing Endpoints with Postman](#6-testing-endpoints-with-postman).

### **4. Project Structure**

#### **Directory Structure:**

- `src/`: Source code directory.

  - `createdb.sql`: SQL script for creating the initial database schema.
  - `crudOperations.js`: Database CRUD operations.
  - `databaseSetup.js`: Database setup script to run the `createdb.sql` file.
  - `dbConnect.js`: Database connection configuration file.
  - `elevatorManager.js`: Core logic for managing the elevator system.
  - `routes.js`: API route definitions.

- `main.js`: Server entry point.

### **5. Technologies Used**

- **Languages:**
  -JavaScript (Node.js)

- **Frameworks/Libraries:**
  -Node.js
  -Express.js
  -MySQL

### **6. Testing Endpoints with Postman**

To test the API endpoints, use the Postman collection provided:

1. Download and install Postman if you haven't already.
2. Open the [ElevatorApp Endpoints Test Collection](https://www.postman.com/bold-space-679599/workspace/elevator-app-endpoints-test/overview) in Postman.
3. Use the collection to send requests and test the API functionality.
