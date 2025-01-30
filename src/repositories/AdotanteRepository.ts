import { Repository } from "typeorm";
import InterfaceAdotanteRepository from "./interface/InterfaceAdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteRepository implements InterfaceAdotanteRepository {

    private adotanteRepository: Repository<AdotanteEntity>;

    constructor(adotanteRepository: Repository<AdotanteEntity>) {
        this.adotanteRepository = adotanteRepository;
    }
    
    async listaAdotantes(): Promise<AdotanteEntity[]> {
        return await this.adotanteRepository.find();
    }

    async criarAdotante(adotante: AdotanteEntity): Promise<void> {
            await this.adotanteRepository.save(adotante);
        }

    async atualizaAdotante(id: number, adotante: AdotanteEntity): Promise<{ success: boolean; message: string; } | void> {
        try {
            const adotanteId = await this.adotanteRepository.findOne({ where: { id } });
            if(!adotanteId) {
                throw new Error("Adotante não encontrado.");
            }
            Object.assign(adotanteId, adotante);
            await this.adotanteRepository.save(adotanteId);
            return {success: true, message: "Adotante atualizado com sucesso."}
        } catch (err) {
            return {success: false, message: "Não foi possível atualizar o adotante."}
        }
    }
    async deletaAdotante(id: number): Promise<{ success: boolean; message: string }> {
        try {
            const adotanteId = await this.adotanteRepository.findOne({ where: { id } });
            if(!adotanteId) {
                throw new Error("Adotante não encontrado.");
            }
            await this.adotanteRepository.delete(id);
            return {success: true, message: "Usuário deletado com sucesso."}
        } catch(err) {
            return {success: false, message: "Não foi possível deletar o usuário."}
        }
    }

}