import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "./EnderecoEntity";
import PetEntity from "./PetEntity";

@Entity()
export default class AdotanteEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column()
    senha: string;

    @Column({ unique: true })
    celular: string;

    @OneToMany(() => PetEntity, (pets) => pets.adotante)
    pets!: PetEntity[];

    @Column({ nullable: true })
    foto?: string;

    @OneToOne(() => EnderecoEntity, { nullable: true, cascade: true, eager: true })
    @JoinColumn()
    endereco?: EnderecoEntity; // endereco pode ser nulo


    constructor(nome: string, senha: string, celular: string, foto?: string, endereco?: EnderecoEntity) {
        this.nome = nome;
        this.senha = senha;
        this.celular = celular;
        this.foto = foto;
        this.endereco = endereco;
    }
}