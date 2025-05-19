import express from "express";

import { authenticateToken } from "../middlewares/jwt.js";
import { addCredentials, changePassword, deleteCredentials, editCredentials, getCredentials } from "../controllers/app.credentials.js";

const router = express.Router();

router.post("/addCredentials", authenticateToken, addCredentials);
router.get("/getCredentials", authenticateToken, getCredentials);
router.post("/editCredentials", authenticateToken, editCredentials);
router.put("/deleteCredentials/:id", authenticateToken, deleteCredentials);
router.post("/changePassword", authenticateToken, changePassword);



const credentialsRoute = router;

export default credentialsRoute;
