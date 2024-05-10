const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(`Connecting to DB...`);
    const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/SampleDB`, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('DB ERROR:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
