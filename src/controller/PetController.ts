import { Request, Response } from "express";
import TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";

let listaDePets: Array<TipoPet> = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

class PetController {

    static criaPet (req: Request, res: Response) {
        const { nome, dataDeNascimento, adotado, especie} = req.body as TipoPet;
        if(!Object.values(EnumEspecie).includes(especie)) {
            res.status(400).json({erro: "Espécia inválida."});
        }
        const pets = {id: geraId(), nome, dataDeNascimento, adotado, especie};
        listaDePets.push(pets);
        res.status(201).send({message: "Pet criado com sucesso!", pets: pets});
    }

    static listaPets(req: Request, res: Response) {
        res.status(200).json(listaDePets);
    }

    static atualizaPet(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, dataDeNascimento, adotado, especie } = req.body as TipoPet;
        const pet = listaDePets.find((pet) => pet.id === Number(id));
        if(!pet) {
            res.status(404).json({message: "Pet não encontrado, tente novamente."})
        }

        pet.nome = nome;
        pet.dataDeNascimento = dataDeNascimento;
        pet.adotado = adotado;
        pet.especie = especie;
        
        res.status(200).json({message: "Pet atualizado com sucesso!", pet: pet});
    }

    static deletarPet(req: Request, res: Response) {
        const {id} = req.params;
        const pet: TipoPet = listaDePets.find((pet) => pet.id === Number(id));
        if(!pet) {
            res.status(404).json({message: "Pet não encontrado, tente novamente."});
        }
        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);
        res.status(200).json({message: "Pet deletado com sucesso!"});
    }
}

export default PetController;