import mongoose from "mongoose"; // Import Mongoose for MongoDB connection

// Define a type for connection status
type ConnectionObject = {
  isConnected?: number; // This will store the connection status (1 = connected, 0 = disconnected)
};

// Create a global connection object to track the database connection state
const connection: ConnectionObject = {};

/**
 * Connects to the MongoDB database using Mongoose.
 * Ensures that multiple connections are not created.
 */
async function dbConnect(): Promise<void> {
  // If already connected, avoid reconnecting
  if (connection.isConnected) {
    console.log("Database is already connected");
    return; // Stop execution if already connected
  }

  try {
    // Attempt to connect to MongoDB using the connection string from environment variables
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    // Store connection status in the global `connection` object
    connection.isConnected = db.connections[0].readyState; // 1 = connected

    console.log("DB Connected Successfully");
  } catch (error) {
    // If connection fails, log the error and exit the process
    console.log("Database connection Failed", error);
    process.exit(1); // Exit the process with failure code 1
  }
}

export default dbConnect; // Export the function for use in other parts of the application


/* 
🚀 Summary:
✔ Global connection object ensures multiple connections are not created.
✔ async function because database connection is an asynchronous operation.
✔ Uses await to ensure the connection is established before proceeding.
✔ Handles errors properly and exits the process if the connection fails.
*/