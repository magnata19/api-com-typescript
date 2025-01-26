import { Request, Response } from "express";
import TipoPet from "../tipos/TipoPet";

let listaDePets: Array<TipoPet> = [];

class PetController {

    public static criaPet (req: Request, res: Response) {
        const {id, nome, idade, adotado, especie} = <TipoPet>req.body;
        const pets = {id, nome, idade, adotado, especie};
        listaDePets.push(pets);
        res.status(201).send({message: "Pet criado com sucesso!", pets: pets});
    }
}

export default PetController;