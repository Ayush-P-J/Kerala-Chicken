import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";

const DistrictData = new mongoose.Schema(
  {
    districtName: {
      type: String,
      required: true,
    },
    districtCode: {
      type: String,
      required: false,
      unique: true,
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

const District = mongoose.model("District", DistrictData);
export default District;
