import bcrypt from "bcryptjs";
import Credentials from "../models/credentialsModels.js";

export const addCredentials = async (req, res) => {
  try {
    const { level, username, email, password } = req.body;
    console.log("credentials");

    console.log(req.body);

    if (!level || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fields are required.",
      });
    }

    const isExist = await Credentials.exists({
      $or: [{ username }, { email }],
    });

    if (isExist) {
      return res.status(409).json({
        message: " Username or Email already existed",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Credentials({
      level,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Credentials added successfully.",
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getCredentials = async (req, res) => {
  try {
    
    const {
      search = "",
      page = 1,
      limit = 10,
      level = "owner",
      sortField = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {
      level,
      isDeleted: false,
    };

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortField]: sortOrder === "desc" ? -1 : 1 };

    const [credentials, total] = await Promise.all([
      Credentials.find(query).sort(sort).skip(skip).limit(parseInt(limit)),
      Credentials.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      message: "Credentials retrieved successfully",
      data: credentials,
      pagination: {
        total,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (error) {}
};


export const editCredentials = async (req, res) => {
  try {
console.log("edit cred");

    const { _id, username, email } = req.body;
    console.log(req.body);
    

    if (!_id || !username || !email) {
      return res.status(400).json({
        success: false,
        message: "Username and email are required.",
      });
    }

    const existingCredential = await Credentials.findById(_id);
    if (!existingCredential) {
      return res.status(404).json({
        success: false,
        message: "Credential not found.",
      });
    }

    const updatedCredential = await Credentials.findByIdAndUpdate(
      _id,
      {
        username,
        email,
      },
      { new: true }
    );
    if (!updatedCredential) {
      return res.status(500).json({
        success: false,
        message: "Failed to update credentials. Please try again.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Credentials updated successfully.",
      data: updatedCredential,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};


export const deleteCredentials = async (req, res) => {
  try {
    
    console.log("credential");
    const id = req.params.id;


    const credential = await Credentials.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    console.log(credential);
    

    if (!credential) {
      return res.status(404).json({ message: "Credentials not found." });
    }

    res
      .status(200)
      .json({ message: "Credentials deleted successfully.", data: credential });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const changePassword = async (req, res) =>{
  try {
    const {password, _id} = req.body
    
    if(!password || !_id){
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const updatedCredential = await Credentials.findByIdAndUpdate(
      _id,
      {
        password: hashedPassword,
      },
      { new: true }
    );
    if (!updatedCredential) {
      return res.status(500).json({
        success: false,
        message: "Failed to update Password. Please try again.",
      });
    }

    
    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
      data: updatedCredential,
    });

    

  } catch (error) {

    return errorResponse(res, error);
  }
}