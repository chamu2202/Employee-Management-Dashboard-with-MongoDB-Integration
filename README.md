<img width="1899" height="762" alt="Employee-Management-System" src="https://github.com/user-attachments/assets/53d1e1ba-ae57-49b4-9e93-5c40c005301f" />

A simple React-based web application to manage employee records.
This project lets you add, edit, and delete employees, using Ant Design components for the user interface and React for managing state.

Objective

To create an interactive Employee Management Dashboard that:
- Stores employee data in MongoDB
- Displays data using AG Grid
- Allows adding, editing, deleting, and filtering employees
- Includes real-time search, pagination, and sorting

Features

Add new employees with fields: Name, Department, Role, Salary, Status
Edit existing employee details
Delete employees with confirmation
Display employees in a clean, paginated table


Tech Stack

- Backend( Node.js, Express.js, MongoDB, Mongoose)

- Frontend( ReactJS (functional components with hooks)

- Database( MongoDB (local or MongoDB Atlas)

- UI Library( Ant Design for components)

- Data Grid( AG Grid for table functionality)

- HTTP Client( Axios for API communication)

- Environment( Use environment variables for database connection)

- Error Handling( Implement proper error handling on both frontend and backend)

- Responsive Design( Ensure the application works on different screen sizes)

Getting Started

Follow these steps to run the project locally:

1.**Clone this repository**

Backend Setup
```bash
cd backend
npm install
# Create a .env file in backend/ with content:
# MONGODB_URI=mongodb://localhost:27017/employeesdb
npm start
frontend Setup
(cd frontend, npm start)

```bash
git clone https://github.com/yourusername/employee-management-dashboard.git

Run the Server using for backend(cd backend,npm run dev),for frontend(cd frontend, npm start)

![Dashboard Screenshot](public/Employee-Managemnt-System.png)





