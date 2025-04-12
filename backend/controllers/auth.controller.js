import { errorResponse } from "../helpers/errorResponse.js";
import User from "../models/userModels.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request received:", req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    const user = await User.findOne({ email, isDeleted: false });

    if (!user) {
      return res.status(404).json({ message: "User not found!", success: false });
    }

    // ✅ Correct bcrypt.compare usage: (plain, hash)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    return res
      .status(200)
      .json({ message: "Login successful", success: true, data: userData });
  } catch (error) {
    return errorResponse(res, error);
  }
};
