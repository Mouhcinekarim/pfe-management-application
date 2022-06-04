import { Component, OnInit } from '@angular/core';
import { PFE } from 'src/app/model/PFE';
import { Group } from 'src/app/model/groupe';
import { ServicePfeService } from 'src/app/service/service-pfe.service';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
  listprof:PFE[];
  listGroup:Group[];
  niveux:string;
  email_prof:string;
  constructor(private fileService:ServicePfeService, private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.email_prof=this.localStorage.retrieve('email');
    
  }

  cherche(){
    this.fileService.getProfTitre(this.email_prof,this.niveux).subscribe((profs)=>{
      this.listprof=profs;
      console.log( this.listprof)
    })
    this.fileService.getEtudiantGroup(this.email_prof,this.niveux).subscribe((groups)=>{
      this.listGroup=groups;
      console.log(this.listGroup)
    })
  }

  mellange(){
    this.fileService.mellangeGroupPfe(this.email_prof,this.niveux).subscribe();
  }

}
