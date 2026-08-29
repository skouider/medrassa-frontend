import { Classe } from "./classe.model";
import { Genre } from "../models/genre.enum";
import { TypeClasse } from "../models/type-classe.enum";
import { StatutInscription } from "../models/statut-inscription.enum";

export interface Inscription {

  id?: number;

  reference?: string;

  nom?: string;

  prenom?: string;

  dateNaissance?: Date;

  telephone?: string;
  
  nomTuteur?: string;
  
  genre?: Genre;

  typeClasse?: TypeClasse;

  statut?: StatutInscription;

  classe?: Classe;

}