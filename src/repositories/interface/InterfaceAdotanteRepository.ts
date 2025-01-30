import AdotanteEntity from "../../entities/AdotanteEntity";

export default interface InterfaceAdotanteRepository {
    criarAdotante(adotante: AdotanteEntity): void | Promise<void>;
    listaAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;
    atualizaAdotante(id: number, adotante: AdotanteEntity): Promise<{success: boolean, message: string} | void>;
    deletaAdotante(id: number): Promise<{success: boolean, message: string}> | void;
}