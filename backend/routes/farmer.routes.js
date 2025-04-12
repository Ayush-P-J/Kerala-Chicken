import express from "express";
import {
  addFarmer,
  deleteFarmer,
  editFarmer,
  getFarmers,
} from "../controllers/farmer.controller.js";
import { authenticateToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/addFarmer", authenticateToken, addFarmer);
router.get("/getFarmer", authenticateToken, getFarmers);
router.post("/editFarmer", authenticateToken, editFarmer);
router.put("/deleteFarmer/:id", authenticateToken, deleteFarmer);

const farmerRoute = router;

export default farmerRoute;
