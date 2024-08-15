// src/database/database.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL;

    if (!uri) {
      throw new Error('MONGO_URL is not defined in .env file');
    }

    await mongoose.connect(uri);

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

export default connectDB;
