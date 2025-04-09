import { errorResponse } from "../helpers/errorResponse.js";
import Farmer from "../models/farmerModels.js";
// Add Farmer
export const addFarmer = async (req, res) => {
  try {
    const {
      farmerCode,
      farmerName,
      supervisorName,
      phone,
      email,
      aadhaar,
      bankName,
      accountNumber,
      ifsc,
      branch,
      address,
      pincode,
      district,
    } = req.body;

    console.log("add farmer")
    console.log(req.body)

    const isExist = await Farmer.exists({
      $or: [{ farmerCode }, { phone }],
    });

    if (isExist) {
      return res
        .status(409)
        .json({ message: "Farmer with the same code or phone already exists." });
    }

    const newFarmer = new Farmer({
      farmerCode,
      farmerName,
      supervisorName,
      phone,
      email,
      aadhaar,
      bankName,
      accountNumber,
      ifsc,
      branch,
      address,
      pincode,
      district,
    });

    await newFarmer.save();

    return res.status(200).json({
      message: "Farmer added successfully.",
      success: true,
      data: newFarmer,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

// Get Farmers
export const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find({isDeleted: false}).populate("supervisorName").populate("district")

    console.log("farmers")
    console.log(farmers)

    const validFarmers = farmers.filter(
      (f) => f.supervisorName?.isDeleted === false && f.district?.isDeleted == false
    );

    return res.status(200).json({
      message: "Farmers retrieved successfully.",
      success: true,
      data: validFarmers,
    });

  } catch (error) {
    return errorResponse(res, error);
  }
};

// Edit Farmer
export const editFarmer = async (req, res) => {
  try {
    const {
      _id,
      farmerCode,
      farmerName,
      supervisorName,
      phone,
      email,
      aadhaar,
      bankName,
      accountNumber,
      ifsc,
      branch,
      address,
      pincode,
      district,
    } = req.body;

    if (!_id || !farmerName) {
      return res.status(400).json({
        success: false,
        message: "Farmer ID and Name are required.",
      });
    }

    const existingFarmer = await Farmer.findById(_id);
    if (!existingFarmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found.",
      });
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(
      _id,
      {
        farmerCode,
        farmerName,
        supervisorName,
        phone,
        email,
        aadhaar,
        bankName,
        accountNumber,
        ifsc,
        branch,
        address,
        pincode,
        district,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Farmer updated successfully.",
      data: updatedFarmer,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteFarmer = async (req, res) => {
  try {
    const id = req.params.id;
    const farmer = await Farmer.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Supervisor deleted successfully.", data: farmer });
  } catch (error) {
    return errorResponse(res, error);
  }
};
