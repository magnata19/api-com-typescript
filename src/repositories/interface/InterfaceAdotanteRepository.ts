import AdotanteEntity from "../../entities/AdotanteEntity";

export default interface InterfaceAdotanteRepository {
    criarAdotante(adotante: AdotanteEntity): void | Promise<void>;
}