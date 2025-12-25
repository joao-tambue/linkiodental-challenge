import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};
export default connectDB;