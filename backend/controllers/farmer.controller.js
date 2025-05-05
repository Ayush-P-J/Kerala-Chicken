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
// export const getFarmers = async (req, res) => {
//   try {
//     console.log("get farmers");

//     const {
//       search = "",
//       page = 1,
//       limit = 20,
//       sortField = "createdAt",
//       sortOrder = "desc",
//     } = req.query;

//     // Base query
//     const query = {
//       isDeleted: false
//     };

//     // Search functionality
//     if (search) {
//       query.$or = [
//         { farmerName: { $regex: search, $options: "i" } },
//         { farmerCode: { $regex: search, $options: "i" } },

//       ];
//     }


//     // Sort configuration
//     const sort = { [sortField]: sortOrder === "desc" ? -1 : 1 };

//     // Pagination
//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     const [farmers, total] = await Promise.all([
//       Farmer.find(query)
//         .populate([
//           {
//             path: "supervisorName",
//             match: { isDeleted: false }
//           },
//           {
//             path: "district",
//             match: { isDeleted: false }
//           }
//         ])
//         .sort(sort)
//         .skip(skip)
//         .limit(parseInt(limit))
//         .then(results => 
//           results.filter(f => 
//             f.supervisorName?.isDeleted === false && 
//             f.district?.isDeleted === false
//           )
//         ),
//       Farmer.countDocuments(query)
//     ]);

//     return res.status(200).json({
//       success: true,
//       message: "Farmers retrieved successfully.",
//       data: farmers,
//       pagination: {
//         total,
//         currentPage: parseInt(page),
//         totalPages: Math.ceil(total / parseInt(limit)),
//         limit: parseInt(limit)
//       }
//     });

//   } catch (error) {
//     console.error("Error fetching farmers:", error);
//     return errorResponse(res, error);
//   }
// };

export const getFarmers = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 20,
      sortField = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Base query
    const query = {
      isDeleted: false
    };

    // Search functionality
    if (search) {
      query.$or = [
        { farmerName: { $regex: search, $options: "i" } },
        { farmerCode: { $regex: search, $options: "i" } },
      ];
    }

    // Sort configuration
    const sort = { [sortField]: sortOrder === "desc" ? -1 : 1 };
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Use aggregation pipeline for proper filtering before pagination
    const aggregationPipeline = [
      { $match: query },
      // Lookup for supervisor
      {
        $lookup: {
          from: "supervisors", // your supervisor collection name
          localField: "supervisorName",
          foreignField: "_id",
          as: "supervisorName"
        }
      },
      { $unwind: { path: "$supervisorName", preserveNullAndEmptyArrays: false } },
      { $match: { "supervisorName.isDeleted": false } },
      // Lookup for district
      {
        $lookup: {
          from: "districts", // your district collection name
          localField: "district",
          foreignField: "_id",
          as: "district"
        }
      },
      { $unwind: { path: "$district", preserveNullAndEmptyArrays: false } },
      { $match: { "district.isDeleted": false } },
      // Sort and paginate
      { $sort: sort },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: parseInt(limit) }]
        }
      }
    ];

    const [result] = await Farmer.aggregate(aggregationPipeline);
    
    const farmers = result.data;
    const total = result.metadata[0]?.total || 0;

    return res.status(200).json({
      success: true,
      message: "Farmers retrieved successfully.",
      data: farmers,
      pagination: {
        total,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    console.error("Error fetching farmers:", error);
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
