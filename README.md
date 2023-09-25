<<<<<<< HEAD
# Elevator-App-MySQL
=======

# ElevatorApp

### **1. Project Overview**

- **Project Name:** ElevatorApp
- **Description:** ElevatorApp is a software system for managing a network of three elevators using Node.js and Express.js. It provides an API for calling and controlling elevators efficiently.

### **2. Installation and Setup**

#### **Requirements:**

Before you can run ElevatorApp, make sure you have the following prerequisites and dependencies installed on your system:

- **Node.js:** Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

- **npm (Node Package Manager):** npm comes bundled with Node.js. You can verify its installation by running `npm -v` in your terminal.

- **Express.js:** ElevatorApp uses the Express.js framework for API endpoints. You can install it using npm:

  ```bash
  npm install express
  ```

- **Other Dependencies:** To install other project-specific dependencies, navigate to your project directory and run:

  ```bash
  npm install
  ```

Now that you have the required prerequisites and dependencies in place, let's proceed with setting up the project.

#### **Installation:**

Follow these steps to set up ElevatorApp locally:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/elevator-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd elevator-app
   ```

3. Install project-specific dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node elevatorServer.js
   ```

   The ElevatorApp server will now be running, and you can access it at `http://localhost:3000` in your web browser.

### **3. Project Features**

#### **List of Features:**

- **Call Elevator:** Users can call an elevator to a specific floor by sending a POST request to `/callElevator`.
  ![img-of-postman-call]()

- **Simultaneous Calls:** Multiple users can simultaneously call elevators to different floors, and the system efficiently assigns the nearest available elevator.
 ![img-of-postman-severalcalls]()

- **Status Information:** Users can retrieve the status of all elevators by sending a GET request to `/elevator/status`.
 ![img-of-postman-getStatus]()

- **Elevator Availability:** Users can check if a specific elevator is available by sending a GET request to `/elevator/available/:elevatorId`.
 ![img-of-postman-checkAvailibility]()

#### **Usage Examples:**

##### Calling an Elevator:

To call an elevator to a specific floor (e.g., floor 5), send a POST request with JSON data:

```json
{
  "floor": 5
}
```

##### Checking Elevator Availability:

To check if Elevator 1 is available, send a GET request to `/elevator/available/1`.

### **4. Project Structure**

#### **Directory Structure:**

The project is organized as follows:

- `elevatorManager.js`: Contains the main logic for managing elevators and the elevator system.

- `elevator.js`: Defines the Elevator class.

- `elevatorServer.js`: Initializes the Express.js server and API endpoints.

- `node_modules/`: Contains project dependencies installed via npm.

- `README.md`: This readme file.

#### **Key Files:**

- `elevatorManager.js`: The core logic for elevator management and the elevator system.

- `elevator.js`: Defines the Elevator class with methods for elevator movement.

- `elevatorServer.js`: Initializes the Express.js server and API endpoints.

### **5. Technologies Used**

#### **Languages:**

- JavaScript (Node.js)

#### **Frameworks/Libraries:**

- Node.js
- Express.js

>>>>>>> edf2f35 (Create README.md)
