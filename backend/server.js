{/*// Load environment variables first
const dotenv = require('dotenv');
dotenv.config();

// Import dependencies
const express = require('express');

const cors = require('cors');
const connectDB = require('./config/database');
const employeeRoutes = require('./routes/employees');
const { MongoClient } = require("mongodb");

console.log(process.env)

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();
dotenv.config()

MongoClient.connect(process.env.MONGODB_URI)
.then(()=> {
  console.log("MongoDB connected succesfully")
})
.catch((error)=> {
  console.log("Error, error")
})

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// API routes
app.use('/api/employees', employeeRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler (for unexpected errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    // Only show error details in development mode
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});   */}



// backend/server.js

{/*import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import employeeRoutes from './routes/employeeRoutes.js'; // make sure this file exists and has valid routes

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection failed:', error.message);
}); */}



process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import employeeRoutes from './routes/employees.js';

{/*MongoClient.connect(process.env.MONGODB_URI)
.then(()=> {
  console.log("MongoDB connected succesfully")
})
.catch((error)=> {
  console.log("Error, error")
}) */}
 

dotenv.config();

const app = express();

app.use(express.json());

// Add your API route
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  


