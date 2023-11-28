import { Component, OnInit } from '@angular/core';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Connexion } from 'src/app/model/connexion';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  //? validations

    connexionValidation = new FormGroup({
      email : new FormControl('',
                                [
                                  Validators.required,
                                  Validators.email
                                ]),
      password : new FormControl('',
                                    [
                                      Validators.required,
                                      Validators.minLength(8)
                                    ])
    });
/*
    getters
*/
    get email(){
      return this.connexionValidation.get('email');
    }

    get password(){
      return this.connexionValidation.get('password');
    }
  //? end validation
  // closeResult=''
  connexion:Connexion={
    email:'',
    password:''
  }
  inscriptionMsg: string;
  isError: boolean;

  constructor( private inscriptionService:LoginService,private router:Router,
    private toastr:ToastrService,private activateRoute:ActivatedRoute ) { }


    ngOnInit(): void {

       this.activateRoute.queryParams.subscribe
    (params => {
      if(params['registered'] !== '' && params['registered']==='true') {
        this.toastr.success('inscription réussite');
        this.inscriptionMsg ='vous pouvez consultez votre email pour activer votre compte'
      }
    })

    }


  Connexion(){
    // this.verifierEmail(email);
    console.log(' 1 ...')

    this.inscriptionService.Connexion(this.connexion).subscribe(data=>{

        this.isError=false;
        this.router.navigateByUrl('/');
        this.toastr.success('connexion reussite');
        console.log('2 ...')
      },
      error=>{
        this.isError = true;
        this.toastr.error('error s\'est produit');
        this.toastr.warning('verifier votre email/password');
        console.log('3 ...');

        throw(error);

        // this.toastr.warning('')
      });
    }

    // console.log(this.connexion);
  }




