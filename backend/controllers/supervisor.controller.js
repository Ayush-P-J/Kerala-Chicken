import { errorResponse } from "../helpers/errorResponse.js";
import Farmer from "../models/farmerModels.js";
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
    const supervisors = await Supervisor.find({ isDeleted: false }).populate(
      "districtName"
    );
    console.log("something");

    const validSupervisors = supervisors.filter(
      (s) => s.districtName?.isDeleted === false
    );
    // console.log(supervisors);
    // if (supervisors.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No supervisors found.",
    //     data: [],
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: "supervisors retrieved successfully.",
      data: validSupervisors,
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
    console.log("Error updating:", error);
    return errorResponse(res, error);
  }
};

export const deleteSupervisor = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("delete supervisor");

    const activeFarmers = await Farmer.findOne({
      supervisorName: id,
      isDeleted: false,
    });

    if (activeFarmers) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete supervisor with active farmers.",
      });
    }

    const supervisor = await Supervisor.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!supervisor) {
      return res
        .status(404)
        .json({ success: false, message: "Supervisor not found." });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Supervisor deleted successfully.",
        data: supervisor,
      });
  } catch (error) {
    return errorResponse(res, error);
  }
};
