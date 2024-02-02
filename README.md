# 🛗Elevator-App-MongoDb

**Table of Contents**

- [Project Overview](#project-overview)
- [Installation and Setup](#installation-and-setup)
  - [Requirements](#requirements)
  - [Installation](#installation)
- [Project Features](#project-features)
  - [List of Features](#list-of-features)
  - [Usage Examples](#usage-examples)
    - [Calling an Elevator](#calling-an-elevator)
    - [Checking Elevator Availability](#checking-elevator-availability)
- [Project Structure](#project-structure)
  - [Directory Structure](#directory-structure)
  - [Key Files](#key-files)
- [Technologies Used](#technologies-used)
  - [Languages](#languages)
  - [Frameworks/Libraries](#frameworkslibraries)

#

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
   git clone https://github.com/PhilHacks/Elevator-App-MongoDb.git
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd Elevator-App-MongoDb
   ```
3. **Install the required Dependencies:**

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node elevatorServer.js
   ```

   The ElevatorApp server will now be running, and you can access it at `http://localhost:3000` in your web browser or postman.

#

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

#### **Languages:**

- JavaScript (Node.js)

<<<<<<< HEAD
#### **Frameworks/Libraries:**

- Node.js
- Express.js

### **6. Testing with postman**
To test the API endpoints, download and import the [ElevatorApp Endpoints Postman Collection]([https://www.getpostman.com/collections/your-collection-url](https://www.postman.com/bold-space-679599/workspace/elevator-app-endpoints-test/overview)) into Postman.
- Download and install Postman if you haven't already.
- Use the collection to send requests and test the API functionality.


