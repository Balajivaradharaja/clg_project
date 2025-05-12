import mongoose from 'mongoose';

const connectdb = async () => {
  try {
    await mongoose.connect('mongodb+srv://balaji:yj2ZAcABiA1CyVfc@cluster0.2icw6vn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(' MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectdb;
