import { Repository } from "typeorm";
import InterfaceAdotanteRepository from "./interface/InterfaceAdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteRepository implements InterfaceAdotanteRepository {

    private adotanteRepository: Repository<AdotanteEntity>;

    constructor(adotanteRepository: Repository<AdotanteEntity>) {
        this.adotanteRepository = adotanteRepository;
    }

    async criarAdotante(adotante: AdotanteEntity): Promise<void> {
        await this.adotanteRepository.save(adotante);
    }
}