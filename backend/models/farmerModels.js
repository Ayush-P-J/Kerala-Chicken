import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    farmerCode: {
      type: String,
      required: true,
      unique: true,
    },
    farmerName: {
      type: String,
      required: true,
    },
    supervisorName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supervisor",
      required: true,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    aadhaar: {
      type: String,
      required: false,
    },
    bankName: {
      type: String,
      required: false,
    },
    accountNumber: {
      type: String,
      required: false,
    },
    ifsc: {
      type: String,
      required: false,
    },
    branch: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    pincode: {
      type: String,
      required: false,
    },
    panNumber: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
