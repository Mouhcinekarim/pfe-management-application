import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inscription } from 'src/app/model/inscription';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  inscription:Inscription ={
    nom:'',
    prenom:'',
    email:'',
    password:''
  }
  constructor(private inscriptionService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  log(field:any){
    console.log(field);
  }

  Inscription(){
    this.inscriptionService.Inscription(this.inscription).subscribe(() => {
      this.router.navigate(['/login'],
      { queryParams: { registered:'true'}}
      );
    }
    );
    // console.log(this.inscription);
  }
}
