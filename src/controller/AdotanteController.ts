import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteController {

    private adotanteRepository: AdotanteRepository;

    constructor(adotanteRepository: AdotanteRepository) {
        this.adotanteRepository = adotanteRepository;
    }

    async criarAdotante(req: Request, res: Response): Promise<any>{
        try {
            const { nome, senha, celular, foto, endereco } = req.body as AdotanteEntity;
            const adotante = new AdotanteEntity(nome, senha, celular, foto, endereco);
            await this.adotanteRepository.criarAdotante(adotante);
            return res.status(201).json({message:"Adotante criado com sucesso!", adotante: adotante});
        } catch (err) {
            return res.status(404).json({message: "Erro interno no servidor.", error: err})
        }
    }
}