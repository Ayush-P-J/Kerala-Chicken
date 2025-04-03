import mongoose from "mongoose";

const DistrictData = new mongoose.Schema({
  districtName: {
    type: String,
    required: true,
  },
  districtCode: {
    type: String,
    required: false,
    unique: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const District = mongoose.model("District", DistrictData);
export default District;
