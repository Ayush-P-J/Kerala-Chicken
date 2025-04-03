import { errorResponse } from "../helpers/errorResponse.js";
import Supervisor from "../models/supervisorModels.js";

export const addSupervisor = async (req, res) => {
  try {
    console.log("hits");

    const {
      districtName,
      supervisorCode,
      supervisorName,
      phoneNumber,
      email,
      drivingLicenseNo,
      expiry,
      adharCardNo,
      bankName,
      accountNo,
      ifscCode,
      branch,
    } = req.body;

    console.log(req.body);

    const isExist = await Supervisor.exists({
      $or: [{ supervisorCode }, { phoneNumber }],
    });

    if (isExist) {
      return res
        .status(409)
        .json({ message: "Supervisor code already existed" });
    }

    const supervisor = new Supervisor({
      districtName,
      supervisorCode,
      supervisorName,
      phoneNumber,
      email,
      drivingLicenseNo,
      expiry,
      adharCardNo,
      bankName,
      accountNo,
      ifscCode,
      branch,
    });

    await supervisor.save();

    return res.status(200).json({ message: "ok", success: true });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getSupervisor = async (req, res) => {
  try {
    const supervisors = await Supervisor.find().populate("districtName");
    // console.log(supervisors);
    if (supervisors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No supervisors found.",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "supervisors retrieved successfully.",
      data: supervisors,
    });
  } catch (error) {
    console.error("Error fetching supervisors:", error);
    return errorResponse(res, error);
  }
};

export const editSupervisor = async (req, res) => {
  try {
    console.log("hitteds");

    const {
      _id,
      districtName,
      supervisorCode,
      supervisorName,
      phoneNumber,
      email,
      drivingLicenseNo,
      expiry,
      adharCardNo,
      bankName,
      accountNo,
      ifscCode,
      branch,
    } = req.body;
    console.log(req.body);
    
    if (!_id || !supervisorName) {
      return res.status(400).json({
        success: false,
        message: "Supervisor ID and District Name are required.",
      });
    }

    const existingSupervisor = await Supervisor.findById(_id);
    if (!existingSupervisor) {
      return res.status(404).json({
        success: false,
        message: "District not found.",
      });
    }

    const updatedSupervisor = await Supervisor.findByIdAndUpdate(
      _id,
      {
        districtName,
        supervisorCode,
        supervisorName,
        phoneNumber,
        email,
        drivingLicenseNo,
        expiry,
        adharCardNo,
        bankName,
        accountNo,
        ifscCode,
        branch,
      },
      { new: true }
    );
    if (!updatedSupervisor) {
      return res.status(500).json({
        success: false,
        message: "Failed to update supervisor. Please try again.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Supervisor updated successfully.",
      data: updatedSupervisor,
    });
  } catch (error) {
    console.log("Error updating:",error)
    return errorResponse(res, error);
  }
};
