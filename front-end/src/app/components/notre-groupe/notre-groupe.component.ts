import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-notre-groupe',
  templateUrl: './notre-groupe.component.html',
  styleUrls: ['./notre-groupe.component.css']
})
export class NotreGroupeComponent implements OnInit {
  role:string='groupe'
  username='mouhcine2001k@gmail.com'
  constructor(private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.username=this.localStorage.retrieve('email');
  }

}
