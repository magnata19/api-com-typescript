import express, { Request, RequestHandler, Response, Router } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import AdotanteController from "../controller/AdotanteController";
import { middlewareValidadorBodyAdotante } from "../middleware/validation/adotanteRequestBody";
import { middlewareValidationBodyEndereco } from "../middleware/validation/enderecoRequestBody";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));
const adotanteController = new AdotanteController(adotanteRepository);

const validateBodyAdotante: RequestHandler = (req, res, next) => middlewareValidadorBodyAdotante(req, res, next);
const validateBodyEndereco: RequestHandler = (req, res, next) => middlewareValidationBodyEndereco(req, res, next);

router.get("/", (req: Request, res: Response) => adotanteController.listaAdotantes(req, res));
router.post("/", validateBodyAdotante,(req: Request, res:Response) => adotanteController.criarAdotante(req, res));
router.put("/:id", (req: Request, res: Response) => adotanteController.atualizaAdotante(req, res));
router.delete("/:id", (req: Request, res: Response) => adotanteController.deletaAdotante(req, res));
router.patch("/:id", validateBodyEndereco, (req: Request, res: Response) => adotanteController.atualizaEnderecoAdotante(req, res));

export default router;