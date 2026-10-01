import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbconnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB database connection established successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

export default dbconnect;

