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
    listaPets(): Array<PetEntity> {
        throw new Error("Method not implemented.");
    }
    atualizaPet(id: number, pet: PetEntity): void {
        throw new Error("Method not implemented.");
    }
    deletaPet(id: number): void {
        throw new Error("Method not implemented.");
    }

}