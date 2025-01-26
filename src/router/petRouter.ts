import express from "express";
import PetController from "../controller/PetController.js";

const router = express.Router();

router.post("/", PetController.criaPet);

export default router;