import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Connexion } from 'src/app/model/connexion';
import { Inscription } from 'src/app/model/inscription';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  connexion:Connexion={
    email:'',
    password:''
  }

  // listEmails : Connexion[];
  // isExists : boolean;
  // emailNonVerifier : string='';

  inscriptionMsg: string;
  isError: boolean;
  login = new FormGroup({
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
  })
//  getters
  get password(){
    return this.login.get('password');
  }
  // si lEmail et non vérifier

  // verifierEmail(email:string){
  //   this.listEmails.forEach(
  //       emails => {
  //         if(emails.email == email) this.isExists=true
  //         else this.isExists=false
  //       }
  //     )

  // }

  // /////////////////////////
  constructor(private inscriptionService:LoginService,private router:Router,
              private toastr:ToastrService,private activateRoute:ActivatedRoute) {
    // this.inscriptionRequest={
    //   nom:'',
    //   prenom:'',
    //   email:'',
    //   password:''
    // }
   }

  ngOnInit(): void {

    this.activateRoute.queryParams.subscribe
    (params => {
      if(params['registered'] !== '' && params['registered']==='true') {
        this.toastr.success('inscription réussite');
        this.inscriptionMsg ='vous pouvez consultez votre email pour activer votre compte'
      }else{
      }
    })
    // this.inscriptionService.ListEmailsNonVerifier().subscribe(
    //   emails => {
    //     this.listEmails = emails
    //     console.log(this.listEmails);
    //   }
    // )
  }



  Connexion(){
    // this.verifierEmail(email);

    this.inscriptionService.Connexion(this.connexion).subscribe(data=>{

        this.isError=false;
        this.router.navigateByUrl('/');
        this.toastr.success('connexion reussite');
      },
      error =>
      {
        this.isError = true;
        this.toastr.error('connexion echoué');
        // this.toastr.warning('')
      });
    }

    // console.log(this.connexion);
}

