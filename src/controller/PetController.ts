import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../tipos/tiposPet";
class PetController {

    constructor(private repository: PetRepository) {
    }

    async criaPet (req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>): Promise<any> {
        const { nome, dataDeNascimento, adotado, especie, porte} = req.body as PetEntity;
        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({error: {erro: "Espécia inválida."}});
        }

        if(porte) {
            if(!(porte in EnumPorte)) {
                return res.status(400).json({error: {erro: "Porte inválido."}});
            }
        }
        const pet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);

        await this.repository.criaPet(pet);
        return res.status(201).send({data: {id: pet.id, nome, especie, porte}});
    }

    async listaPetById(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>) {
        const { id } = req.params;
        const pet = await this.repository.listaPetById(Number(id));
        if(!pet) {
            res.status(404).json({error: {message: "Pet não encontrado."}});
        }
        res.status(200).json({data: pet});
    }

    async listaPets(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>): Promise<any> {
        const listaDePets = await this.repository.listaPets();
        const data = listaDePets.map((pet) => {
            return {
                id: pet.id,
                nome: pet.nome,
                especie: pet.especie,
                porte: pet.porte
            }
        })
        return res.status(200).json({data});
    }

    async atualizaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>): Promise<any> {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(Number(id), req.body as PetEntity);
        if(!success) {
            return res.status(404).json({error: message});
        }
        return res.status(200).json({success: message});
    }

    async deletarPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>): Promise<any>{
        const { id } = req.params;
        const {success, message} = await this.repository.deletaPet(Number(id)); 
        if (!success) {
            return res.status(404).json({error: message});
        }
        return res.status(204).json({success: message});
        }

    async adotaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>): Promise<any> {
        const { pet_id, adotante_id } = req.params;
        const { success, message } = await this.repository.adotaPet(
            Number(pet_id), 
            Number(adotante_id)
        );

        if(!success) {
            return res.status(404).json({error: message});
        }
        return res.status(204).send({success: message});
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