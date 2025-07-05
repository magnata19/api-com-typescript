import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interface/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";
import { NotFoundError } from "../utils/manipulaErros";

export default class PetRepository implements InterfacePetRepository {

    private petRepository: Repository<PetEntity>;
    private adotanteRepository: Repository<AdotanteEntity>;

    constructor(petRepository: Repository<PetEntity>, adotanteRepository: Repository<AdotanteEntity>) {
        this.petRepository = petRepository;
        this.adotanteRepository = adotanteRepository;
    }

    async criaPet(pet: PetEntity): Promise<PetEntity> {
        return this.petRepository.save(pet);
    }


    async listaPets(): Promise<PetEntity[]> {
        return await this.petRepository.find();
    }

    async atualizaPet(id: number, newData: PetEntity): Promise<{ success: boolean, message?: string }> {
        const petFound = await this.petRepository.findOne({ where: { id } });
        if (!petFound) {
            throw new NotFoundError("Pet não encontrado.");
        }

        Object.assign(petFound, newData);

        await this.petRepository.save(petFound);
        return { success: true, message: "Pet atualizado com sucesso." };
    }

    async deletaPet(id: number): Promise<{ success: boolean, message?: string }> {
        const petId = await this.petRepository.findOne({ where: { id: id } });
        if (!petId) {
            throw new NotFoundError("Pet não encontrado.");
        }
        await this.petRepository.delete(id);
        return { success: true, message: "Pet deletado com sucesso." };
    }

    async listaPetById(id: number): Promise<PetEntity> {
        const petId = await this.petRepository.findOne({
            where: {
                id: id
            }
        })
        if (!petId) {
            throw new NotFoundError("Pet não encontrado...");
        }
        return petId;
    }

    async adotaPet(pet_id: number, adotante_id: number): Promise<{ success: boolean, message: string }> {
        const petId = await this.petRepository.findOne({ where: { id: pet_id } });
        if (!petId) {
            throw new NotFoundError("Pet não encontrado.");
        }

        const adotanteId = await this.adotanteRepository.findOne({ where: { id: adotante_id } });
        if (!adotanteId) {
            throw new NotFoundError("Adotante não encontrado.");
        }

        petId.adotante = adotanteId;
        petId.adotado = true;
        await this.petRepository.save(petId);
        return { success: true, message: "Pet adotado com sucesso!" };
    }

    //esse metodo e responsavel por filtrar um pet com base no campo e valor generico
    async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> {
        const pets = await this.petRepository.find({ where: { [campo]: valor } });
        return pets;
    }
}