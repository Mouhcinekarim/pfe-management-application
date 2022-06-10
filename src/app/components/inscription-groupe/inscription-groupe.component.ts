import { Group } from './../../model/groupe';
import { Inscription } from 'src/app/model/inscription';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Connexion } from 'src/app/model/connexion';
import { Etudiant } from 'src/app/model/Etudiant';
import { ServicePfeService } from 'src/app/service/service-pfe.service';
import { LoginService } from 'src/app/service/login.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-inscription-groupe',
  templateUrl: './inscription-groupe.component.html',
  styleUrls: ['./inscription-groupe.component.css']
})
export class InscriptionGroupeComponent implements OnInit {

  nbrEtudiant:number=0;
  ListEtudiant:Etudiant[]=[];
  groupe:Group;
  etudiant:Etudiant;

  constructor(private fileService:ServicePfeService,private inscriptionService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.groupe=new Group();
    this.etudiant=new Etudiant();

   }

  // ? inscription validation
  inscriptionValidationGroupe = new FormGroup({
    email : new FormControl('',
                           [
                              Validators.required,
                              Validators.pattern('[a-zA-Z0-9._-]+@[a-z0-9._-]{2,6}\.[a-z0-9._-]{2,}\.[a-z]{1,4}$')
                            ]),
    password : new FormControl('',
                              [
                                Validators.required,
                                Validators.minLength(8)
                              ]),
    nombreEtudiant : new FormControl('',
                                    [
                                      Validators.required,
                                      Validators.min(1),
                                      Validators.max(3)
                                    ]),
    nom : new FormControl('',
                            [
                              Validators.required,
                              Validators.minLength(3),
                              Validators.pattern('[a-zA-Z ]*')
                            ]),
    prenom : new FormControl('',
                            [
                              Validators.required,
                              Validators.minLength(3),
                              Validators.pattern('[a-zA-Z ]*')
                            ]),
    apogee : new FormControl('',
                            [
                              Validators.required,
                              Validators.minLength(8),
                              Validators.maxLength(8),
                              Validators.pattern('[0-9]*')
                            ]),
     niveux:new    FormControl('',[ Validators.required]) ,
     departement:new  FormControl('',[ Validators.required])         

    })

  // getters
  get email(){
    return this.inscriptionValidationGroupe.get('email');
  }
  get password(){
    return this.inscriptionValidationGroupe.get('password');
  }
  get nombreEtudiant(){
    return this.inscriptionValidationGroupe.get('nombreEtudiant');
  }
  get nom(){
    return this.inscriptionValidationGroupe.get('nom');
  }
  get prenom(){
    return this.inscriptionValidationGroupe.get('prenom');
  }
  get apogee(){
    return this.inscriptionValidationGroupe.get('apogee');
  }

  // ? end inscription validation


  //? gerer les input
  charge(nbr:any){

    if(nbr!==null){
      for(let i=  nbr>this.ListEtudiant.length? this.ListEtudiant.length:nbr;i< (nbr<this.ListEtudiant.length? this.ListEtudiant.length:nbr);i++) {
        console.log(this.ListEtudiant[i])
        this.ListEtudiant[i]=new  Etudiant();}
        for(let i=nbr;i<this.ListEtudiant.length;i++ ) this.ListEtudiant[i]=undefined
    }
  }
  
  affiche(){
    this.groupe.etudiants=this.ListEtudiant;
    console.log(JSON.stringify(this.groupe))
   // this.fileService.SendGroup(this.groupe).subscribe();

    this.inscriptionService.SendGroup(this.groupe).subscribe(() => {
      this.router.navigate(['/connexion'],
      { queryParams: { registered:'true'}}
      );
    }
    );
  }

}
