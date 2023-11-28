import { Component, OnInit,Input } from '@angular/core';
import { PFEfile } from 'src/app/model/PFEfile';
import {PFEinfo} from 'src/app/model/PFEinfo';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {ServicePfeService} from 'src/app/service/service-pfe.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-affiche-pfe',
  templateUrl: './affiche-pfe.component.html',
  styleUrls: ['./affiche-pfe.component.css']
})
export class AffichePfeComponent implements OnInit {
  @Input() pfe:PFEfile;
  closeResult :string;
  image:Blob
  imageURL:SafeUrl
  pfeUpdate:PFEinfo;
  currentTime = new Date()
  photo:Blob;
  rapport:Blob;
  constructor(private sanitizer: DomSanitizer,private fileService:ServicePfeService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pfeUpdate=new  PFEinfo();
    this.pfeUpdate.conferm=true;
    
  }
   
  base64ToImage(base){
    this.image=this.base64ToBlob(base)
    this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image))
    return this.imageURL
  }
  
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



  // ---------------------------------------------------------update de fichier
  
  chargerapport(event:any){
    // this.pfe.rapport=event.target.files[0];
    this.blobToBase64(event.target.files[0]).then(res=>{
     this.pfe.rapport1=(res as string);
    
   })
 
 }

  chargephoto(event:any){
  // this.pfe.photo=event.target.files[0];
    this.blobToBase64( event.target.files[0]).then(res=>{
    
      this.pfe.photo1=(res as string);
      this.pfe
    })
  
   
  }

  
  // ---------------------convert blob to base64
  blobToBase64  =( blob:Blob) => {
    if(blob!=null){
      console.log(blob)
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise<string|ArrayBuffer>(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  }
  else return null;
  };


  Upload(pfe:PFEfile){
    console.log("w")
    console.log(pfe)
    this.pfeUpdate.anne= pfe.anne
    this.pfeUpdate.description= pfe.description
    this.pfeUpdate.niveau= pfe.niveau
    this.pfeUpdate.idprof= pfe.idprof
    this.pfeUpdate.titre= pfe.titre
    this.pfeUpdate.stage=pfe.stage
    if(pfe.rapport1!=null) this.pfeUpdate.rapport1=pfe.rapport1;
    else{
     
      this.pfeUpdate.rapport1= pfe.rapport;

    }
    if(pfe.photo1!=null) this.pfeUpdate.photo1=pfe.photo1;
    else{
     
   this.pfeUpdate.photo1=  pfe.photo ;

    }
    
    
  
   console.log("pfeupdate")
    console.log(this.pfeUpdate);
   
  
    
   
    
  
    // console.log(JSON.stringify(this.pfeUpdate))
    this.fileService.update(JSON.stringify(this.pfeUpdate),pfe.pfeInfoId).subscribe(
      resp => {
        console.log(resp.status)
        if(resp.status === 200)  console.log("uploaded")
        else console.log("no 200")
      
      }
      
    )
  }
 
  
// ----------------------------Concerne modal 
open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

// -------------------------------
  public base64ToBlob(b64Data:string, contentType='', sliceSize=512) {
   
   
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

}
