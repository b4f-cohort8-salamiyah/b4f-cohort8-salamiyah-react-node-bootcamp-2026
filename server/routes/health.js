import express from "express";
import {getHealthStatues} from "../controllers/healthController.js";

const router = express.Router();

router.get("/", getHealthStatues);

export default router;