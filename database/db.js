const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,  // fail fast instead of retrying forever
      socketTimeoutMS: 45000,
    });

    console.log('✅ Server connected to the database!');

  } catch (err) {
    console.error('❌ DB Connection Error:', err.message);
    process.exit(1); // stop the server if DB fails
  }
};

module.exports = dbConnect;
// const mongoose = require('mongoose');


// const connectDB = async () => {
//   console.log(process.env.MONGO_URI);
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('✅ MongoDB connected successfully');
//   } catch (error) {
//     console.error('❌ MongoDB connection failed:', error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
