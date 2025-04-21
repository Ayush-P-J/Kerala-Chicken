import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default:"user"
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);
export default User;
