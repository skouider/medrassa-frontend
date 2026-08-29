import { Classe } from "../models/classe.model";
import { Genre } from "../models/genre.enum";
import { StatutInscription } from "../models/statut-inscription.enum";
import { TypeClasse } from "../models/type-classe.enum";
import { ClasseResponseDto } from "./classe-response.dto";

export class InscriptionResponseDto {

  id!:number;

  reference?: string;

  dateInscription?: string;

  nom?: string;

  prenom?: string;

  dateNaissance?: string;

  age?: number;

  telephone?: string;

  adresse?: string;

  nomTuteur?: string;

  typeClasse?: TypeClasse;

  genre?: Genre;

  statut?: StatutInscription;

  classe?: ClasseResponseDto;
}

