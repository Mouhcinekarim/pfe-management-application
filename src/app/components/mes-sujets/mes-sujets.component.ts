import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PFEinfo } from 'src/app/model/PFEinfo';
import { PFEfile } from 'src/app/model/PFEfile';
import { ServicePfeService } from 'src/app/service/service-pfe.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mes-sujets',
  templateUrl: './mes-sujets.component.html',
  styleUrls: ['./mes-sujets.component.css']
})
export class MesSujetsComponent implements OnInit {

  pfeValidation = new FormGroup({
    //   * validations ancien et nouveau pfe
    titre : new FormControl('',
                            [
                                Validators.required,
                                Validators.minLength(5),
                                Validators.pattern('[a-zA-Z]*')
                            ]),
    description : new FormControl('',
                                    [
                                        Validators.required,
                                        Validators.minLength(20),
                                        Validators.pattern('[a-zA-Z0-9 ]*')
                                    ]),
    anne : new FormControl('',
                                    [
                                        Validators.required,
                                        Validators.minLength(4),
                                        Validators.maxLength(4),
                                        Validators.min(2010),
                                        Validators.max(2022),
                                        Validators.pattern('[0-9]*')
                                    ]),
    //   * validations ancien pfe
    pageGard : new FormControl('',
                                    [
                                        Validators.required
                                    ]),
    rapport : new FormControl('',
                                [
                                    Validators.required,
                                    Validators.pattern('[.pdf]$')
                                ]),
      niveux : new FormControl('',
                                [
                                  
                                ]),
      stage : new FormControl('',
                                [
                                  
                                ])                                

    });

// getters
get titre(){
    return this.pfeValidation.get('titre');
}
get niveux(){
  return this.pfeValidation.get('niveux');
}
get description(){
    return this.pfeValidation.get('description');
}
get anne(){
    return this.pfeValidation.get('anne');
}
// todo : page garde et rapport
get pageGard(){
    return
}
// * chat validation
// todo : message(description) et fichier validation

// ********************************************************** //
currentTime = new Date()
closeResult :string;
pfe:PFEinfo;
listpfeNoConf:PFEfile[];
email:string;
constructor(private fileService:ServicePfeService, private localStorage:LocalStorageService,  private router:Router) { }

ngOnInit(): void {
  this.pfe=new  PFEinfo();
  this.pfe.idprof= this.localStorage.retrieve('email');
  this.email=this.localStorage.retrieve('email');
  this.pfe.stage=false;
  
  this.fileService.getPfeNoConfirmer(this.email).subscribe((pfe)=>{
    this.listpfeNoConf=pfe;
    console.log(this.listpfeNoConf)
  
  })

}

chargerapport(event:any){
  this.blobToBase64( event.target.files[0]).then(res=>{
   this.pfe.rapport1=(res as string);
   this.pfe.conferm=true
 })

}

chargephoto(event:any){

  this.blobToBase64( event.target.files[0]).then(res=>{
    this.pfe.photo1=(res as string);
    this.pfe
  })

 
}



Upload(){
  this.pfe.titre=this.titre.value;
  this.pfe.niveau=this.niveux.value
  this.pfe.description=this.description.value;
  if(this.pfe.rapport1==null) {
    
    this.pfe.anne=this.currentTime.getFullYear();
  this.pfe.stage=false;
  }
  else { this.pfe.anne=this.anne.value;
          alert(this.pfe.anne)  
  }
  

 
 
  JSON.stringify(this.pfe)
 
  
  
 

  this.fileService.upload(JSON.stringify(this.pfe)).subscribe(
    resp => {
      console.log(resp.status)
      if(resp.status === 200) { this.pfe=new PFEinfo();
                                this.pfe.idprof= this.localStorage.retrieve('email');
                                
                                window.location.reload();

      }
      else console.log("no 200")
    
    }
    
  )
}

// ----------------------------Concerne modal 



// ---------------------convert blob to base64
 blobToBase64  = blob => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise<string|ArrayBuffer>(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

// ---------------------PFE NO CONFIRMER
update(pfe:PFEfile){
  let id=pfe.pfeInfoId
  let pf=new PFEinfo()
  pf.titre=pfe.titre
  pf.anne=pfe.anne
  pf.description=pfe.description
  pf.niveau=pfe.niveau



  this.fileService.update(JSON.stringify(pf),id).subscribe(()=>  window.location.reload()
  );
}


deletepfe(idpfe:number){
  
  this.fileService.deletePfe(idpfe).subscribe(()=>   window.location.reload());
}

}
