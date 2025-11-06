import mongoose from "mongoose";

import { NODE_ENV, DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI variable inside .env.<development/production>.local file"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to the database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to the database", error);

    process.exit(1);
  }
};

export default connectToDatabase;
