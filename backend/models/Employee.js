
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { 
    type: String, 
    enum: ['Engineering', 'Marketing', 'HR', 'Finance', 'Sales', 'Operations'],
    required: true
  },
  role: { type: String, required: true },
  salary: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true }); // adds createdAt and updatedAt

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
