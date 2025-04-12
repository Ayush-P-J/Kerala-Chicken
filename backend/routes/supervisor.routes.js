import express from "express";
import {
  addSupervisor,
  deleteSupervisor,
  editSupervisor,
  getSupervisor,
} from "../controllers/supervisor.controller.js";
import { authenticateToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/addSupervisor", authenticateToken, addSupervisor);
router.get("/getSupervisor", authenticateToken, getSupervisor);
router.post("/editSupervisor", authenticateToken, editSupervisor);
router.put("/deleteSupervisor/:id", authenticateToken, deleteSupervisor);

const supervisorRoute = router;

export default supervisorRoute;
