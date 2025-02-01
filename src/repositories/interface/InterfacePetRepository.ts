import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
    criaPet (pet: PetEntity): void;
    listaPetById(id: number): Promise<PetEntity>;
    listaPets(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizaPet(id: number, pet: PetEntity): void;
    deletaPet(id: number): void;
    adotaPet(pet_id: number, adotante_id: number): void;
    buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> | PetEntity[];
}