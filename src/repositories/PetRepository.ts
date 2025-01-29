import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interface/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository {

    private petRepository: Repository<PetEntity>;

    constructor(petRepository: Repository<PetEntity>) {
        this.petRepository = petRepository;
    }

    async criaPet(pet: PetEntity): Promise<PetEntity> {
        return this.petRepository.save(pet);
    }


    async listaPets(): Promise<PetEntity[]> {
        return await this.petRepository.find();
    }

    async atualizaPet(id: number, newData: PetEntity): Promise<{success: boolean, message?: string}> {
        try {
        const petFound = await this.petRepository.findOne({ where: { id }});
        if(!petFound) {
            throw new Error("Pet não encontrado.");
        }
        
        Object.assign(petFound, newData);

        await this.petRepository.save(petFound);
        return {success: true, message: "Pet atualizado com sucesso."};
        } catch(err) {
            return {success: false,
                message: "Ocorreu um erro ao atualizar o pet."
            }
        }
    }

    async deletaPet(id: number): Promise<{success: boolean, message?: string}> {
        try {
            const petId = await this.petRepository.findOne({ where: { id: id}});
            if(!petId) {
                return {success: false, message: "Pet não encontrado."}
            }
            await this.petRepository.delete(id);
            return {success: true, message: "Pet deletado com sucesso."};
        } catch(err) {
            return {success: false, message: "Não foi possível deletar o pet."}
        }
    }

    async listaPetById(id: number): Promise<PetEntity> {
        const petId =  await this.petRepository.findOne({
            where: {
                id: id
            }
        })
        if(!petId) {
            throw new Error("Pet não encontrado.");
        }
        return petId;
    }
}