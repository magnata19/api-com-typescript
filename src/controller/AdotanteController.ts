import { NextFunction, Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TipoRequestBodyAdotante, TipoRequestParamsAdotante, TipoResponseBodyAdotante } from "../tipos/tiposAdotante";

export default class AdotanteController {

    private adotanteRepository: AdotanteRepository;

    constructor(adotanteRepository: AdotanteRepository) {
        this.adotanteRepository = adotanteRepository;
    }

    async criarAdotante(req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, res: Response<TipoResponseBodyAdotante>, next: NextFunction): Promise<any> {
        try {
            const { nome, senha, celular, foto, endereco } = req.body as AdotanteEntity;
            const adotante = new AdotanteEntity(nome, senha, celular, foto, endereco);
            await this.adotanteRepository.criarAdotante(adotante);
            return res.status(201).json({ data: { id: adotante.id, nome, celular, endereco } });
        } catch (err) {
            next(err)
        }
    }

    async listaAdotantes(req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, res: Response<TipoResponseBodyAdotante>, next: NextFunction): Promise<any> {
        try {
            const adotantes = await this.adotanteRepository.listaAdotantes();
            const data = adotantes.map((adotante) => {
                return {
                    id: adotante.id,
                    nome: adotante.nome,
                    celular: adotante.celular,
                    endereco: adotante.endereco != null ? adotante.endereco : undefined
                }
            })
            return res.status(200).json({ data });
        } catch (err) {
            next(err)
        }
    }

    async atualizaAdotante(req: Request<TipoRequestParamsAdotante, {},
        TipoRequestBodyAdotante>, res: Response<TipoResponseBodyAdotante>, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const { success, message } = await this.adotanteRepository.atualizaAdotante(Number(id), req.body as AdotanteEntity);
            if (!success) {
                return res.status(404).json({ error: message });
            }
        } catch (err) {
            next(err)
        }
    }

    async deletaAdotante(req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, res: Response<TipoResponseBodyAdotante>, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const { success, message } = await this.adotanteRepository.deletaAdotante(Number(id));
            if (!success) {
                return res.status(404).json({ error: message });
            }
            return res.status(204);
        } catch (err) {
            next(err);
        }
    }

    async atualizaEnderecoAdotante(req: Request<TipoRequestParamsAdotante, {}, EnderecoEntity>, res: Response<TipoResponseBodyAdotante>, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const { success, message } = await this.adotanteRepository.atualizaEnderecoAdotante(Number(id), req.body);
            if (!success) {
                return res.status(404).json({ error: message });
            }
            return res.status(200).json({ success: message });
        } catch (err) {
            next(err)
        }
    }
}