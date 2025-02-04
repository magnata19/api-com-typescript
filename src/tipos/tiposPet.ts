import PetEntity from "../entities/PetEntity";

type TipoRequestBodyPet = Omit<PetEntity, "id">; 
type TipoResponseBodyPet = {
    data?: Pick<PetEntity, "id" | "nome" | "porte" | "especie"> | Pick<PetEntity, "id" | "nome" | "porte" | "especie">[]; 
    error?: unknown;
    success?: unknown;
};
type TipoRequestParamsPet = {id?: string, pet_id: string, adotante_id: string};

export type {TipoRequestBodyPet, TipoResponseBodyPet, TipoRequestParamsPet};