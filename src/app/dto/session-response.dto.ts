import { TypeClasse } from "../models/type-classe.enum";

export class SessionOuvertureDTO{

   id?: number | undefined;  

  libelle?:string;

  dateOuverture?:string;

  dateFermeture?:string;

  active?:boolean;

  nombreClasses?:number;

   configurations?:TypeClasse[] = [];

}