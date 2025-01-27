import express, { Router } from "express";
import PetController from "../controller/PetController.js";

const router: Router = express.Router();

router.get("/", PetController.listaPets);
router.post("/", PetController.criaPet);
router.put("/:id", PetController.atualizaPet);
router.delete("/:id", PetController.deletarPet);
export default router;