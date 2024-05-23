// import mongoose from "mongoose";

// const connectDB = async () => {
//   await mongoose
//     .connect("mongodb://localhost:27017/APIHandling")
//     .then((res) => console.log("Connected to the database"))
//     .catch((error) => console.error("Error connecting to the database"));
// };

// export default connectDB;

import pkg from "pg";
const { Client } = pkg;

const getClient = async () => {
  const client = new Client(
    "postgresql://neondb_owner:WKgsFM08COkP@ep-floral-bread-a5c9qhk4.us-east-2.aws.neon.tech/neondb?sslmode=require"
  );
  await client.connect();
  console.log("Connected to the database");
  return client;
};

export default getClient;
