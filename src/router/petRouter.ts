import express, { NextFunction, Request, Response, Router } from "express";
import PetController from "../controller/PetController.js";
import PetRepository from "../repositories/PetRepository.js";
import { AppDataSource } from "../config/dataSource.js";
import { verificaIdMiddleware } from "../middleware/verificaId.js";

const router: Router = express.Router();
const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

router.get("/", (req: Request, res: Response, next: NextFunction) => petController.listaPets(req as any, res, next));
router.get("/filtro", (req: Request, res: Response, next: NextFunction) => petController.buscaPetPorCampoGenerico(req, res, next));
router.get("/:id", verificaIdMiddleware, (req: Request, res: Response, next: NextFunction) => petController.listaPetById(req as any, res, next));
router.post("/", (req: Request, res: Response, next: NextFunction) => petController.criaPet(req as any, res, next));
router.put("/:id", verificaIdMiddleware, (req: Request, res: Response, next: NextFunction) => petController.atualizaPet(req as any, res, next));
router.delete("/:id", verificaIdMiddleware, (req: Request, res: Response, next: NextFunction) => petController.deletarPet(req as any, res, next));
router.put("/:pet_id/:adotante_id", verificaIdMiddleware, (req: Request, res: Response, next: NextFunction) => petController.adotaPet(req as any, res, next));
export default router;