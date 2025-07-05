import express, { NextFunction, Request, RequestHandler, Response, Router } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import AdotanteController from "../controller/AdotanteController";
import { middlewareValidadorBodyAdotante } from "../middleware/validation/adotanteRequestBody";
import { middlewareValidationBodyEndereco } from "../middleware/validation/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));
const adotanteController = new AdotanteController(adotanteRepository);

const validateBodyAdotante: RequestHandler = (req, res, next) => middlewareValidadorBodyAdotante(req, res, next);
const validateBodyEndereco: RequestHandler = (req, res, next) => middlewareValidationBodyEndereco(req, res, next);

router.get("/", (req: Request, res: Response, next: NextFunction) => adotanteController.listaAdotantes(req, res, next));
router.post("/", validateBodyAdotante, (req: Request, res: Response, next: NextFunction) => adotanteController.criarAdotante(req, res, next));
router.put("/:id", verificaIdMiddleware, (req: Request, res: Response, next: NextFunction) => adotanteController.atualizaAdotante(req, res, next));
router.delete("/:id", verificaIdMiddleware, (req: Request, res: Response, next: NextFunction) => adotanteController.deletaAdotante(req, res, next));
router.patch("/:id", verificaIdMiddleware, validateBodyEndereco, (req: Request, res: Response, next: NextFunction) => adotanteController.atualizaEnderecoAdotante(req, res, next));

export default router;