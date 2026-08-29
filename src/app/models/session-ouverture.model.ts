import { Classe } from "./classe.model";
import { Genre } from "./genre.enum";
import { TypeClasse } from "./type-classe.enum";

export class SessionOuverture {

  id?: number;

  libelle?: string;

  dateOuverture?: string;

  dateFermeture?: string;

  active?: boolean;

   classes?: Array<Classe>;
}
  
