import { Component, OnInit } from '@angular/core';
import {ServicePfeService} from 'src/app/service/service-pfe.service';
import { PFEfile } from 'src/app/model/PFEfile';

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

     
     niveuxSet:Set<string>;
     anneSet:Set<number>;
     annes:number[];
   
  constructor(private fileService:ServicePfeService) { }

  ngOnInit(): void {
    console.log("hello")
    this.anneSet=new Set<number>();
    this.anneSet=new Set<number>();
    this.annes;
    this.niveuxSet=new Set<string>();
    console.log()
    this.fileService.getListPfeByIdProf('hichame@gmail.com').subscribe((resp)=>{
          this.annes=new Array<number>();
          this.listpfe=resp;
         
          this.listpfe.forEach((pfe)=>{
            this.annes.push(pfe.anne)
          
         })
          
         this.annes.sort((a,b)=>b-a);
  
         this.annes.forEach((anne) =>this.anneSet.add(anne))
      
         console.log(this.anneSet)
        
        
    })
  }

 
  getListPfeByniveu(niveux:String,anne:number){
    return this.listpfe.filter((pfe)=> (pfe.niveau==niveux&&pfe.anne==anne))

  }


   getListniveuxByanne(anne:number){
    this.niveuxSet=new Set<string>();
     this.listpfe.filter((pfe)=> (pfe.anne==anne)).forEach((pfe)=>{ 
      console.log(pfe.anne)
      console.log(pfe) 
      this.niveuxSet.add(pfe.niveau);})
     
     return this.niveuxSet
   }
}
