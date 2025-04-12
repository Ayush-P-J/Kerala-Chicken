import express from "express";
import {
  addDistrict,
  deleteDistrict,
  editDistrict,
  getDistrict,
} from "../controllers/district.controller.js";
import { authenticateToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/addDistrict", authenticateToken, addDistrict);

router.get("/getDistrict", authenticateToken, getDistrict);

router.post("/editDistrict", authenticateToken, editDistrict);

router.put("/deleteDistrict/:id", authenticateToken, deleteDistrict);

const districtRoute = router;

export default districtRoute;
