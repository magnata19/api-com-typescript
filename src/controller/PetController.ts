import { Request, Response } from "express";
import TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets: Array<TipoPet> = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

class PetController {

    constructor(private repository: PetRepository) {
    }

    criaPet (req: Request, res: Response) {
        const { nome, dataDeNascimento, adotado, especie} = req.body as PetEntity;
        if(!Object.values(EnumEspecie).includes(especie)) {
            res.status(400).json({erro: "Espécia inválida."});
        }
        const pet = new PetEntity();
        pet.id =  geraId(),
        pet.nome = nome, 
        pet.dataDeNascimento = dataDeNascimento,
        pet.adotado = adotado,
        pet.especie = especie;

        this.repository.criaPet(pet);
        res.status(201).send({message: "Pet criado com sucesso!", pets: pet});
    }

    async listaPetById(req: Request, res: Response) {
        const { id } = req.params;
        const pet = await this.repository.listaPetById(Number(id));
        if(!pet) {
            res.status(404).json({message: "Pet não encontrado."})
        }
        res.status(200).json(pet);
    }

    async listaPets(req: Request, res: Response): Promise<any> {
        const listaDePets = await this.repository.listaPets();
        return res.status(200).json(listaDePets);
    }

    async atualizaPet(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(Number(id), req.body as PetEntity);
        const pet = await this.repository.findById(Number(id));
        if(!success) {
            return res.status(404).json({message})
        }
        return res.status(200).json({message: "Pet atualizado com sucesso!", pet: pet});
    }

    async deletarPet(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const {success, message} = await this.repository.deletaPet(Number(id)); 
        if (!success) {
            return res.status(404).json({message});
        }
        return res.status(204).json(message);
        }
}

export default PetController;