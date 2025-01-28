import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interface/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository {

    private petRepository: Repository<PetEntity>;

    constructor(petRepository: Repository<PetEntity>) {
        this.petRepository = petRepository;
    }

    criaPet(pet: PetEntity): void {
        this.petRepository.save(pet);
    }
    async listaPets(): Promise<PetEntity[]> {
        return await this.petRepository.find();
    }
    async atualizaPet(id: number, pet: PetEntity): Promise<PetEntity> {
        const petFound = await this.petRepository.findOne({ where: { id: id }});
        if(!petFound) {
            throw new Error("Pet não encontrado.")
        }
        petFound.nome = pet.nome;
        petFound.adotado = pet.adotado;
        petFound.especie = pet.especie;
        petFound.dataDeNascimento = pet.dataDeNascimento;

        await this.petRepository.save(petFound);
        
        return petFound;
    }
    async deletaPet(id: number): Promise<any> {
        const petId = await this.petRepository.findOne({ where: { id: id}});
        if(!petId) {
            throw new Error("Pet não encontrado.")
        }
        return await this.petRepository.delete(petId);
    }

    async findById(id: number): Promise<PetEntity> {
        return await this.petRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async listaPetById(id: number): Promise<PetEntity> {
        return await this.petRepository.findOne({
            where: {
                id: id
            }
        })
    }
}