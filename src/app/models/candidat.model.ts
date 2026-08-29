import { User } from "./user.model";


export interface Candidat extends User {

  telephone?: string;

  dateNaissance?: Date;

}