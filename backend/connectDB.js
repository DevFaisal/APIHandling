import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/APIHandling")
    .then((res) => console.log("Connected to the database"))
    .catch((error) => console.error("Error connecting to the database"));
};

export default connectDB;
