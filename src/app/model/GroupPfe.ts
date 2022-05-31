export interface GroupPfe {
    PfeInfoId:number;
	email:string;
	description:string;
	titre:string;	
	niveau:string;
	GroupId:number;
	anne:number;
	etudiant:Etudiant[];
}

interface Etudiant {
    EtudiantId:number;
    nom:string;
    prenom:string;
    Appogee:string;
}