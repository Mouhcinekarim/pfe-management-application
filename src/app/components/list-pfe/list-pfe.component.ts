import { Component, OnInit } from '@angular/core';
import {ServicePfeService} from 'src/app/service/service-pfe.service';
import { PFEfile } from 'src/app/model/PFEfile';
import { LocalStorageService } from 'ngx-webstorage';
import 'node_modules/jquery/dist/jquery.min.js'
import 'C:/Users/user/Desktop/PFE/Projet Angular/front-end/src/assets/assets/js/theme.js'
import 'node_modules/popper.js/dist/umd/popper.min.js'
@Component({
  selector: 'app-list-pfe',
  templateUrl: './list-pfe.component.html',
  styleUrls: ['./list-pfe.component.css']
})
export class ListPfeComponent implements OnInit {
     panelOpenState = false;
     listpfe:PFEfile[];
     
     pfechoi:PFEfile

     titre:string;
     niveuxSet:Set<string>;
     anneSet:Set<number>;
     annes:number[];
     listpfeFilter:PFEfile[];
  constructor(private fileService:ServicePfeService,private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.anneSet=new Set<number>();
    this.anneSet=new Set<number>();
    this.annes;
    this.niveuxSet=new Set<string>();

    this.fileService.getListPfeByIdProf( this.localStorage.retrieve('email')).subscribe((resp)=>{
          this.annes=new Array<number>();
          this.listpfe=resp;
          this.listpfeFilter=resp;
          this.search()
        //   this.listpfe.forEach((pfe)=>{
        //     this.annes.push(pfe.anne)
          
        //  })
          
        //  this.annes.sort((a,b)=>b-a);
  
        //  this.annes.forEach((anne) =>this.anneSet.add(anne))
      
        //  console.log(this.anneSet)
        
        
    })
  }
  search(){
  
  if(this.titre==null) this.titre='';
   
  this.listpfeFilter=this.listpfe.filter((pfe)=>pfe.titre.indexOf(this.titre)!==-1);
  console.log( this.listpfeFilter);
  this.getanne();
  }


  getanne(){
  
    this.listpfeFilter.forEach((pfe)=>{
      this.annes.push(pfe.anne)
    })
    this.annes.sort((a,b)=>b-a);
  
    this.annes.forEach((anne) =>this.anneSet.add(anne))
   this.anneSet;
  }
 
  getListPfeByniveu(niveux:String,anne:number){
    return this.listpfeFilter.filter((pfe)=> (pfe.niveau==niveux&&pfe.anne==anne))

  }


   getListniveuxByanne(anne:number){
    this.niveuxSet=new Set<string>();
    this.listpfeFilter.filter((pfe)=> (pfe.anne==anne)).forEach((pfe)=>{ 
      console.log(pfe.anne)
      console.log(pfe) 
      this.niveuxSet.add(pfe.niveau);})
     
     return this.niveuxSet
   }
}
