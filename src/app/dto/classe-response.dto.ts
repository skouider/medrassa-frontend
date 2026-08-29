import { Genre } from "../models/genre.enum";
import { TypeClasse } from "../models/type-classe.enum";
import { SessionOuvertureDTO } from "./session-response.dto";

export class ClasseResponseDto {

  id?:number;

  nom?:string;

  ageMin?:number;

  ageMax?:number;

  capacite?:number;

  genre?:Genre;

  typeClasse?:TypeClasse;

  session?:SessionOuvertureDTO;

  nombreInscrits?:number;

  placesDisponibles?:number;

  complet?:boolean;

  
}
