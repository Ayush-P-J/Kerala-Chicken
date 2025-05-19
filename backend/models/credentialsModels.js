import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";

const CredentialsData = new mongoose.Schema(
  {
    level: {
      type: String,
      enum: ["owner", "supervisor", "staff"],
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    
  },
  { timeStamp: true }
);

const Credentials = mongoose.model("Credentials", CredentialsData);
export default Credentials;
