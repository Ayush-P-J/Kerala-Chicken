import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

export async function connectDB() {
    return mongoose.connect(process.env.MONGO_URI, {
     
    })
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.error("Connection error:", err));
    
}