import express, { Request, Response, Router } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import AdotanteController from "../controller/AdotanteController";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));
const adotanteController = new AdotanteController(adotanteRepository);

router.get("/", (req: Request, res: Response) => adotanteController.listaAdotantes(req, res));
router.post("/",(req: Request, res:Response) =>adotanteController.criarAdotante(req, res));
router.put("/:id", (req: Request, res: Response) => adotanteController.atualizaAdotante(req, res));
router.delete("/:id", (req: Request, res: Response) => adotanteController.deletaAdotante(req, res));
router.patch("/:id",(req: Request, res: Response) => adotanteController.atualizaEnderecoAdotante(req, res));

export default router;