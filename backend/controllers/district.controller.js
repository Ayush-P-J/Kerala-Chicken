import { log } from "node:console";
import { errorResponse } from "../helpers/errorResponse.js";
import District from "../models/districtModels.js";
import Supervisor from "../models/supervisorModels.js";

export const addDistrict = async (req, res) => {
  try {
    console.log("hitted");

    const { districtName, districtCode } = req.body;
    if (!districtName || !districtCode) {
      return res.status(400).json({
        success: false,
        message: "Fields are required.",
      });
    }

    const isDistrictExist = await District.exists({
      $or: [{ districtName }, { districtCode }],
    });
    // console.log(req.body);

    if (isDistrictExist) {
      return res.status(409).json({
        message: "District name or code already existed",
        success: false,
      });
    }

    const district = new District({
      districtName,
      districtCode,
    });

    await district.save();

    return res.status(201).json({
      success: true,
      message: "District added successfully.",
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getDistrict = async (req, res) => {
  try {
    console.log("get district");
    const districts = await District.find({ isDeleted: false });
    // if (districts.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No districts found.",
    //     data: [],
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: "Districts retrieved successfully.",
      data: districts,
    });
  } catch (error) {
    console.error("Error fetching districts:", error);
    return errorResponse(res, error);
  }
};

export const editDistrict = async (req, res) => {
  try {
    console.log("hitted");

    const { _id, districtName, districtCode } = req.body;

    if (!_id || !districtName) {
      return res.status(400).json({
        success: false,
        message: "District ID and District Name are required.",
      });
    }

    const existingDistrict = await District.findById(_id);
    if (!existingDistrict) {
      return res.status(404).json({
        success: false,
        message: "District not found.",
      });
    }

    const updatedDistrict = await District.findByIdAndUpdate(
      _id,
      {
        districtName,
        districtCode,
      },
      { new: true }
    );
    if (!updatedDistrict) {
      return res.status(500).json({
        success: false,
        message: "Failed to update district. Please try again.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "District updated successfully.",
      data: updatedDistrict,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteDistrict = async (req, res) => {
  try {
    console.log("delete district");
    
    const id = req.params.id;
    const activeSupervisors = await Supervisor.findOne({
      districtName: id,
      isDeleted: false,
    });

    if (activeSupervisors) {
      return res.status(400).json({
        message: "Cannot delete district with active supervisors.",
      });
    }

    const district = await District.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!district) {
      return res.status(404).json({ message: "District not found." });
    }

    res
      .status(200)
      .json({ message: "District deleted successfully.", data: district });
  } catch (error) {
    return errorResponse(res, error);
  }
};
export const activateDistrict = async (req, res) => {
  try {
  } catch (error) {
    return errorResponse(res, error);
  }
};
