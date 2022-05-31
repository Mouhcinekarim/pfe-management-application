import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import 'src/assets/js/script.min.js';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor(private loginService:LoginService,
    private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loginService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.loginService.email.subscribe((data: string) => this.email = data);
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.email = this.loginService.getEmail();
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
