import { Request, Response } from "express";
import TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import { error } from "console";
import { truncateSync } from "fs";

let listaDePets: Array<TipoPet> = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

class PetController {

    constructor(private repository: PetRepository) {
    }

    async criaPet (req: Request, res: Response): Promise<any> {
        const { nome, dataDeNascimento, adotado, especie, porte} = req.body as PetEntity;
        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({erro: "Espécia inválida."});
        }

        if(porte) {
            if(!(porte in EnumPorte)) {
                return res.status(400).json({erro: "Porte inválido."});
            }
        }
        const pet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);

        await this.repository.criaPet(pet);
        return res.status(201).send({message: "Pet criado com sucesso!", pets: pet});
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
        if(!success) {
            return res.status(404).json({message})
        }
        return res.status(200).json({message: "Pet atualizado com sucesso!"});
    }

    async deletarPet(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const {success, message} = await this.repository.deletaPet(Number(id)); 
        if (!success) {
            return res.status(404).json({message});
        }
        return res.status(204).json(message);
        }

    async adotaPet(req: Request, res: Response): Promise<any> {
        const { pet_id, adotante_id } = req.params;
        const { success, message } = await this.repository.adotaPet(
            Number(pet_id), 
            Number(adotante_id)
        );

        if(!success) {
            return res.status(404).json(message);
        }
        return res.status(204).json(message);
    }

    async buscaPetPorCampoGenerico(req: Request, res: Response): Promise<any> {
        const {campo, valor} = req.query;
        const listaDePets = await this.repository.buscaPetPorCampoGenerico(
            campo as keyof PetEntity,
            valor as string
        );
        return res.status(200).json(listaDePets);
    }
}

export default PetController;