import EnumEspecie from "../enum/EnumEspecie";

type TipoPet = {
    id: number,
    nome: string,
    especie: EnumEspecie,
    dataDeNascimento: Date,
    adotado: boolean
}

export default TipoPet;