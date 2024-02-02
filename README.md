# 🛗Elevator-App-MongoDb

## ElevatorApp

## Table of Contents

- [Project Overview](#1-project-overview)
- [Installation and Setup](#2-installation-and-setup)
- [Project Features](#3-project-features)
- [Project Structure](#4-project-structure)
- [Technologies Used](#5-technologies-used)
- [Testing Endpoints with Postman](#6-testing-endpoints-with-postman)

### **1. Project Overview**

**Project Name:** ElevatorApp  
**Description:** ElevatorApp is a Node.js application for managing a network of elevators. It provides API endpoints for calling elevators to specific floors, checking elevator availability, and tracking elevator status. This version uses MongoDB with Mongoose for data storage and management.

### **2. Installation and Setup**

#### **Requirements:**

- Node.js
- npm (Node Package Manager)
- MongoDB

#### **Installation:**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/PhilHacks/Elevator-App-MongoDb
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd Elevator-App-MongoDb
   ```
3. **Install the required Dependencies:**
   ```bash
   npm install
   ```

#### **Database Initialization and Configuration**

Ensure your MongoDB database is set up and running before launching the application. Follow these steps to prepare your environment:

#### **Install MongoDB:**

- Follow the instructions to download and install MongoDB for your platform from the [MongoDB Downloads](https://www.mongodb.com/try/download/community) page.

#### **Configure Database Connection:**

1. **Create a `.env` File:**
   - In the root directory of your project, create a `.env` file to store your database connection details securely.

2. **Populate `.env` with MongoDB Details:**
   - Fill in the `.env` file with your MongoDB connection string:
     ```plaintext
     DB_URI=mongodb://localhost:27017/elevatorApp
     ```

3. **Integration with `dbConnect.js`:**
   - The `DB_URI` value from the `.env` file is used in the `dbConnect.js` script to establish a connection to the MongoDB database.

#### **Launch the Application:**

- With the database running, start the application server:
  ```bash
  npm start
  ```
- The API will now be accessible at `http://localhost:3000`.

### **3. Project Features**

This application offers several API endpoints for managing and tracking elevators:

- **Call Elevator:**
  - **Endpoint:** `/callElevator`
  - **Method:** POST
  - **Description:** Request an elevator to a specified floor. Include the desired floor in the request body as `{ "floor": number }`.
- **Elevator Status:**
  - **Endpoint:** `/elevator/status`
  - **Method:** GET
  - **Description:** Get the status of all elevators, including their current floor and availability.
- **Check Elevator Availability:**
  - **Endpoint:** `/elevator/available/:elevatorId`
  - **Method:** GET
  - **Description:** Check if a specific elevator is available by providing the elevator ID in the URL.

### **4. Project Structure**

#### **Directory Structure:**

- `src/`: Source code directory.
  - `crudOperations.js`: Functions to handle CRUD operations for elevator calls.
  - `dbConnect.js`: Configuration for MongoDB database connection.
  - `elevatorManager.js`: Core logic for managing the elevator system.
  - `elevatorModel.js`: Mongoose schema and model for elevator data.
  - `routes.js`: API route definitions.
- `main.js`: The entry point of the application where the Express server is set up.

### **5. Technologies Used**

- **Languages:** JavaScript (Node.js)
- **Frameworks/Libraries:** Node.js, Express.js, MongoDB, Mongoose

### **6. Testing Endpoints with Postman**

To test the API endpoints, download and import the [ElevatorApp Endpoints Postman Collection]([https://www.getpostman.com/collections/your-collection-url](https://www.postman.com/bold-space-679599/workspace/elevator-app-endpoints-test/overview)) into Postman.

- Download and install Postman if you haven't already.
- Use the collection to send requests and test the API functionality.

