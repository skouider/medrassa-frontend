import { Genre } from "../models/genre.enum";
import { TypeClasse } from "../models/type-classe.enum";
import { Inscription } from "./inscription.model";
import { SessionOuverture } from "./session-ouverture.model";

export interface Classe {

  id?: number;

  nom: string;

  ageMin: number;

  ageMax: number;

  capacite: number;

  genre: Genre;

  typeClasse: TypeClasse;

  session: SessionOuverture;

  inscriptions?:Inscription[];

  
}