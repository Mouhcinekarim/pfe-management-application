import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mes-groupes',
  templateUrl: './mes-groupes.component.html',
  styleUrls: ['./mes-groupes.component.css']
})
export class MesGroupesComponent implements OnInit {
  role:string='Professeur'
  username:string='hichame@gmail.com'
  constructor() { }

  ngOnInit(): void {
  }

}
