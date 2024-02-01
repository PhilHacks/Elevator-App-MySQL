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
3. **Install the required  Dependencies:**
   ```bash
   npm install
   ```

#### **Database Initialization and Configuration**

Before running the application, you need to set up and initialize the MySQL database.

- **Install MySQL:**
  Download the MySQL Community Server from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/). Choose the version that matches your operating system and complete the installation process. Remember to note down the password for the MySQL root user that you set during installation.


**Configure Database Connection:**
- **Create a .env File:** In the project root directory, create a `.env` file to store your database connection details securely. This prevents sensitive information from being tracked in version control.
  
- **Add Database Configuration:** Populate the `.env` file with your MySQL connection details. Replace `your_root_password` with the password you noted during MySQL installation.
  ```plaintext
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=your_root_password
  DB_NAME=sql_elevators
  ```
- **Integration:** The `.env` variables are utilized by `dbConnect.js` for establishing the database connection. This setup ensures sensitive details remain secure and not hard-coded within your application's source files.

**Initialize Database:**
- Make sure your MySQL service is running. Then, initialize your database schema with the provided script:
  ```bash
  npm run init_db
  ```

4. **Launch the Application:**
   Start your application server with:
   ```bash
   npm start
   ```
   Access the API at `http://localhost:3000`.



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

To test these endpoints, you can use the provided Postman collection, which includes requests for all the above functionalities. For more details on how to use Postman for testing, refer to the [Testing Endpoints with Postman](#6-testing-endpoints-with-postman) section.

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

- **Languages:** JavaScript (Node.js)
- **Frameworks/Libraries:** Node.js, Express.js, MySQL

### **6. Testing Endpoints with Postman**

To test the API endpoints, use the Postman collection provided:

1. Download and install Postman if you haven't already.
2. Open the [ElevatorApp Endpoints Test Collection](https://www.postman.com/bold-space-679599/workspace/elevator-app-endpoints-test/overview) in Postman.
3. Use the collection to send requests and test the API functionality.
