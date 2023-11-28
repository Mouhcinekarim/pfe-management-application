import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscription } from 'src/app/model/inscription';
import { Prof } from 'src/app/model/Prof';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import 'src/assets/js/script.min.js';

@Component({
  selector: 'app-inscription-prof',
  templateUrl: './inscription-prof.component.html',
  styleUrls: ['./inscription-prof.component.css']
})
export class InscriptionProfComponent implements OnInit {


  //? inscription validation
  prof:Prof;
  InscriptionValidationProf = new FormGroup({
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
    email : new FormControl('', [
                                Validators.required,
                             
                                Validators.pattern('[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}(\.[a-z]{2,4})$')
                              ]),
    password : new FormControl('',
                              [
                                Validators.required,
                                Validators.minLength(8)
                              ]),
    departement :  new FormControl(''),
    chef :  new FormControl('')

  })


  // getters
  get nom(){
    return this.InscriptionValidationProf.get('nom');
  }
  get prenom(){
    return this.InscriptionValidationProf.get('prenom');
  }
  get email(){
    return this.InscriptionValidationProf.get('email');
  }
  get password(){
    return this.InscriptionValidationProf.get('password');
  }

  // ? end inscription validation
  inscription:Inscription ={
    nom:'',
    prenom:'',
    email:'',
    password:''
  }

  constructor(private inscriptionService:LoginService,private router:Router){
    this.prof=new Prof();
  }

  ngOnInit(): void {

  }

  log(field:any){
    console.log(field);
  }

  Inscription(){
    this.inscriptionService.InscriptionProf(this.prof).subscribe(() => {
      this.router.navigate(['/connexion'],
      { queryParams: { registered:'true'}}
      );
    }
    );
    // console.log(this.inscription);
  }

}
