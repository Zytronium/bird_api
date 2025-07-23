#!/usr/bin/node
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}.${process.env.DNS_ID}.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER_NAME}`;

export const connectDB = async () => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (let tries = 0; tries <= 15; tries ++) {
    let error;
    try {
      await mongoose.connect(uri);
      console.log("Connected to the BIRD Hive"); // (BIRD Hive = MongoDB Atlas db)
      return;
    } catch (err) {
      console.error(`(${tries}/15) Failed to connect to the BIRD Hive. ${err.name}: "${err.message}"`);
      error = err;
    }
    if (tries === 15) {
      console.error("Failed to connect to MongoDB:", error);
      console.warn("WARNING: BIRD Hive not connected");
      // process.exit(1);
      }
    else
      await sleep(250);
  }
};
