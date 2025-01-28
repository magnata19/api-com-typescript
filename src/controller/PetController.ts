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
        const { nome, dataDeNascimento, adotado, especie } = req.body as PetEntity;
        const pet = await this.repository.findById(Number(id));
        if(!pet) {
            res.status(404).json({message: "Pet não encontrado, tente novamente."})
        }
        pet.nome = nome;
        pet.dataDeNascimento = dataDeNascimento;
        pet.especie = especie;
        pet.adotado = adotado;
        await this.repository.atualizaPet(Number(id), pet);

        return res.status(200).json({message: "Pet atualizado com sucesso!", pet: pet});
    }

    async deletarPet(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const pet: PetEntity = await this.repository.findById(Number(id));
        if(!pet) {
            res.status(404).json({message: "Pet não encontrado, tente novamente."});
        }
        await this.repository.deletaPet(Number(id));
        return res.status(204);
    }
}

export default PetController;