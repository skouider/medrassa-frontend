import { Genre } from "../models/genre.enum";
import { TypeClasse } from "../models/type-classe.enum";

export class InscriptionDto {

  id!:number;    

  classeId!: number;

  nom!: string;

  prenom!: string;

  dateNaissance!: string;

  telephone!: string;

  adresse!: string;

  nomTuteur!: string;

  typeClasse!: TypeClasse;

  genre!: Genre;

}