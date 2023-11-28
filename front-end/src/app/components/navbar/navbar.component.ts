import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  email: string;

  constructor(private loginService:LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.loginService.email.subscribe((data: string) => this.email = data);
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.email = this.loginService.getEmail();
  }

  logout() {

    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');

  }

  //? ajouter prof profile si possible

}
