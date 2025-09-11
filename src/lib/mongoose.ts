/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import mongoose from "mongoose";

/**
 * Custom modules
 */
import config from "@/config";

/**
 * Types
 */
import type { ConnectOptions } from "mongoose";

/**
 * Client option
 */
const clientOptions: ConnectOptions = {
  dbName: "youtube-db",
  appName: "Youtube API",
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

export const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error("MongoDB URI is not defined in the configuration.");
  }

  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);

    console.log("Connected to database successfully.", {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }

    console.log("Error connecting to the database", err);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();

    console.log("Disconnected from the database successfully.", {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    console.log("Error connecting to the database", err);
  }
};
