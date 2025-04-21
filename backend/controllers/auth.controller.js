import { errorResponse } from "../helpers/errorResponse.js";
import User from "../models/userModels.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log("🔐 Login request received:", req.body);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({email})

    console.log(user)

    if(!user)return res.status(400).json({message:'Invalid email or password',success:false})



    
    // Check if an admin already exists


      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid credentials",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Login successful",
        success: true,
        data: {name:user.name,
          email:user.email,
          role:user.role,
          id:user._id},
      });
    

    // No admin exists yet – create one with the credentials
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newAdmin = await User.create({
    //   email,
    //   password: hashedPassword,
    //   role: "admin",
    // });

    // console.log("✅ New admin created:", newAdmin.email);

  } catch (error) {
    console.error("❌ Error in login API:", error.message);
    return errorResponse(res, error);
  }
};
