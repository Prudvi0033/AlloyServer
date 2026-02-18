import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Database already connected");
      return;
    }

    const conn = await mongoose.connect(process.env.MONGOOSE_URI as string);
    console.log("Connected the DB", conn.connection.host);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
