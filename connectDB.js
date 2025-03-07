// import mongoose from "mongoose";

const connectDB = async (mongoose) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully".bgGreen.white);
  } catch (error) {
    console.error("Unable to connect to the database".bgRed.white, error);
  }
};

export default connectDB;
