export class Filter{
    titre:string;
    niveau:string;
    encadrant:string;
    nom_departement:string;
    stage:string;
    anne:string;
    nom:string;
    prenom:string;
    separer(){
        if(this.encadrant!=''){
      let aray=  this.encadrant.split(" ")
      this.prenom=aray[1];
      this.nom=aray[0];}
      else{
        this.prenom='';
      this.nom='';
      }
    }

}