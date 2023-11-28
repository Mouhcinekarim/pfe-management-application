import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-mes-groupes',
  templateUrl: './mes-groupes.component.html',
  styleUrls: ['./mes-groupes.component.css']
})
export class MesGroupesComponent implements OnInit {
  role:string='Professeur'
  username:string
  constructor(private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.username=this.localStorage.retrieve('email');
  }

}
