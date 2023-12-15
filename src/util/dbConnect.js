import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedConnection = null;

async function dbConnect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const opts = {
    // useNewUrlParser ve useUnifiedTopology seçeneklerini kaldırın
    bufferCommands: false,
  };

  try {
    const connection = await mongoose.connect(MONGODB_URI, opts);
    cachedConnection = connection;
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("MongoDB connection error");
  }
}

export default dbConnect;
