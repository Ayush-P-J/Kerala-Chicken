import mongoose from "mongoose";

const SupervisorSchema = new mongoose.Schema({
  districtName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  supervisorCode: {
    type: String,
    required: true,
    unique: true,
  },
  supervisorName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  drivingLicenseNo: {
    type: String,
    required: false,
  },
  expiry: {
    type: Date,
    required: false,
  },
  adharCardNo: {
    type: String,
    required: false,
  },
  bankName: {
    type: String,
    required: false,
  },
  accountNo: {
    type: String,
    required: false,
  },
  ifscCode: {
    type: String,
    required: false,
  },
  branch: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Supervisor = mongoose.model("Supervisor", SupervisorSchema);
export default Supervisor;
