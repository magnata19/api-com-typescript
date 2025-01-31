import express, { Request, Response, Router } from "express";
import PetController from "../controller/PetController.js";
import PetRepository from "../repositories/PetRepository.js";
import { AppDataSource } from "../config/dataSource.js";

const router: Router = express.Router();
const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

router.get("/",(req: Request, res: Response) =>  petController.listaPets(req, res));
router.get("/:id", (req: Request, res: Response) => petController.listaPetById(req, res));
router.post("/", (req: Request, res: Response) => petController.criaPet(req, res));
router.put("/:id",(req: Request, res: Response) =>  petController.atualizaPet(req, res));
router.delete("/:id",(req: Request, res: Response) =>  petController.deletarPet(req, res));
router.put("/:pet_id/:adotante_id", (req: Request, res: Response) => petController.adotaPet(req, res));
export default router;