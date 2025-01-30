import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

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

    async listaAdotantes(req: Request, res: Response): Promise<any> {
        try {
            const adotantes = await this.adotanteRepository.listaAdotantes();
            return res.status(200).json(adotantes);
        } catch (err) {
            return res.status(404).json({message: "Não foi possível listar todos os adotantes.", error: err});
        }
    }

    async atualizaAdotante(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { nome, senha, celular, foto, endereco } = req.body as AdotanteEntity;
            const adotante = new AdotanteEntity(nome, senha, celular, foto, endereco);
            await this.adotanteRepository.atualizaAdotante(Number(id), adotante);
            return res.status(200).json({message: "Adotante atualizado com sucesso!"});
        } catch (err) {
            return res.status(404).json({message: "Não foi possível atualizar o adotante, tente novamente mais tarde!"});
        }
    }

    async deletaAdotante(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            await this.adotanteRepository.deletaAdotante(Number(id));
            return res.status(204).json({message: "Adotante deletado com sucesso!"});
        } catch (err) {
            res.status(404).json({message: "Não foi possível deletar o adotante, tente novamente mais tarde!"});
        }
    }

    async atualizaEnderecoAdotante(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { success, message } = await this.adotanteRepository.atualizaEnderecoAdotante(Number(id), req.body as EnderecoEntity);
        if (!success) {
            return res.status(404).json(message);
        }
        return res.status(200).json(message);
    }
}