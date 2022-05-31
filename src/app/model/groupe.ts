import{Etudiant }from "./Etudiant"
export class Group{
    niveau:string;
    email:string;
    password:string;
    anne:number;
    datecreate:Date;
    depatementId:number;
    etudiants:Etudiant[];
}