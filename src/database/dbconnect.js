import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async (url) => {
  try {
    const uri = url;
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
