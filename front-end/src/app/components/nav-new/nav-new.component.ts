import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import 'src/assets/js/script.min.js';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicePfeService } from 'src/app/service/service-pfe.service';
@Component({
  selector: 'app-nav-new',
  templateUrl: './nav-new.component.html',
  styleUrls: ['./nav-new.component.css']
})
export class NavNewComponent implements OnInit {


  
  // status: boolean = true;
  faux:boolean=false;
  //
  isLoggedIn: boolean;
  email: string;
  type:string;
  Ischef:boolean;
  constructor(private loginService:LoginService,
    private router: Router,private toastr:ToastrService,private fileService:ServicePfeService) { }

  ngOnInit(): void {
    this.loginService.loggedIn.subscribe((data: boolean) =>{ this.isLoggedIn = data
      
      if(this.isLoggedIn){
        this.email = this.loginService.getEmail();
        if(this.email.split('@')[1].split('.').length==2) this.type='Professeur'
        else this.type='groupe'
        this.fileService.getIschef(this.email).subscribe((rs)=>{this.Ischef=rs
          
        })
        }
    });
    this.loginService.email.subscribe((data: string) =>{ this.email = data
      if(this.isLoggedIn){
        if(this.email.split('@')[1].split('.').length==2) this.type='Professeur'
        else this.type='groupe'
        
        }
    });
    this.isLoggedIn = this.loginService.isLoggedIn();
    if( this.isLoggedIn){ this.email = this.loginService.getEmail();
      this.fileService.getIschef(this.email).subscribe((rs)=>{this.Ischef=rs
    
      })}
   
    if(this.isLoggedIn){
    if(this.email.split('@')[1].split('.').length==2) this.type='Professeur'
    else this.type='groupe'
    
    }
    
  }

  // clickEvent(){
  //     this.status = !this.status;
  // }


logout() {

    this.loginService.logout();
    this.isLoggedIn = false;
    this.toastr.info('vous êtes déconnectés')
    this.router.navigateByUrl('/');
  }

}
