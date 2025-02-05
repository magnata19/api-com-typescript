import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">; 
type TipoResponseBodyAdotante = {
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco"> 
         | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[]; 
    error?: unknown;
    success?: unknown;
};
type TipoRequestParamsAdotante = {id?: string};

export type {TipoRequestBodyAdotante, TipoResponseBodyAdotante, TipoRequestParamsAdotante};