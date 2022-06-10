import { Component, OnInit } from '@angular/core';
import { Filter } from 'src/app/model/filter';
import { PFE } from 'src/app/model/PFE';
import { ServicePfeService } from 'src/app/service/service-pfe.service';
import { LoginService } from 'src/app/service/login.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import 'src/assets/assets1/js/scrolling.js'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  status: boolean = true;
  isLoggedIn: boolean;
  email: string;
  type:string;
  image:Blob
  imageURL:SafeUrl
  anneSelect:String;
  constructor(private fileService:ServicePfeService,private loginService:LoginService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.anneSelect="L'anne";
    this.niveauSet= new Set<string>();
    for(let i=2010;i<=2024;i++) this.annes.push(i)
    this.filter= new Filter();
    this.filter.anne="L'anne";
    this.loginService.loggedIn.subscribe((data: boolean) => {
     
      this.isLoggedIn = data});
    this.loginService.email.subscribe((data: string) => this.email = data);
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.email = this.loginService.getEmail();
    this.getList();
    
  }

   remlistrecomm(){
  
   }
  clickEvent(){
        this.status = !this.status;
    }

    // NOTE : rechercher

    valide:boolean=true
    ListPFE:PFE[];
    filterlist:PFE[]=[];
    filter:Filter;
    annes:Number[]=[];
    niveauSet:Set<string>;
    encadrentSet:Set<string>;
    NomDepartementSet:Set<string>;
    listRecomment:PFE[];
    nom_departement:string;
    RemplirChearch(){
      this.niveauSet= new Set<string>();
      this.encadrentSet=new Set<string>();
      this.NomDepartementSet=new Set<string>();
      
      this.ListPFE.forEach((pfe)=>{

        this.niveauSet.add(pfe.niveau);
        this.encadrentSet.add(`${pfe.nom} ${pfe.prenom}`);
        this.NomDepartementSet.add(pfe.nom_departement);

      })

     
      }




    validee(){
    this.valide=false
    }
    sepparer(event){
      this.filter.separer();
      this.cherche(event);
    }
    cherche(event){
    if(this.filter.anne=="L'anne") this.filter.anne=''
 
    if(!(typeof this.ListPFE==='undefined'))  this.filterlist =this.ListPFE.filter(pfe=>this.isExist(pfe,this.filter) )
    if(this.filter.anne=="") this.filter.anne="L'anne"
    }
    isStage(event){
      if(event.target.checked) this.filter.stage='true'
      else this.filter.stage=''
      this.cherche(event)
    }
    isExist(pfe,filter){
    let find=true
    
    Object.keys(filter).forEach((key)=>{
      if(! (typeof pfe[key]=== 'undefined')){
      var  textSearch='';

      textSearch=pfe[key].toString();
    textSearch.toLowerCase();
      var res =(textSearch.indexOf(filter[key])!==-1)
      if(res===false){
        find=false;
      }
    }})
    return find
    }



    getList(){


if(this.isLoggedIn){

      this.fileService.getAll().subscribe(
        PFES=>{
         
          this.ListPFE=PFES;
          this.RemplirChearch();
          this.remlistrecomm()
      })
    }
    }

    //doawload
    Doawload(base64:any,titre:string,type:string){
      const blob=this.base64ToBlob(base64);
     
      // console.log("daw");
      // console.log(base64)

      const a = document.createElement('a')
          const objectUrl = URL.createObjectURL(blob)
          a.href = objectUrl
          a.download = `${titre}.${type}`;
          a.click();
          URL.revokeObjectURL(objectUrl);
    }

    public base64ToBlob(b64Data, contentType='', sliceSize=512) {
      b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
      let byteCharacters = atob(b64Data);
      let byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          let slice = byteCharacters.slice(offset, offset + sliceSize);

          let byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
          let byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }
      return new Blob(byteArrays, {type: contentType});
  }


  base64ToImage(base){
    this.image=this.base64ToBlob(base)
    this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image))
    return this.imageURL
  }

}
