import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGODB_URI); 
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if DB fails to connect
  }
};

export default connectDB;
