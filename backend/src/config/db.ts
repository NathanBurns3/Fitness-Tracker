import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || '';

if (
  !mongoURI.startsWith('mongodb://') &&
  !mongoURI.startsWith('mongodb+srv://')
) {
  throw new Error('Invalid MongoDB connection string');
}

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
