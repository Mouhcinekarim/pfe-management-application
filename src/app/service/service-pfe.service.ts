import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../model/groupe';
import { GroupPfe } from '../model/GroupPfe';
import { PFE } from '../model/PFE';
import { PFEfile } from '../model/PFEfile';
import { Prof } from '../model/Prof';

@Injectable({
  providedIn: 'root'
})
// export class ServicePfeService {

//   private server = "http://localhost:8084";
//   constructor(private http:HttpClient) { }
// upload(formData:FormData){
//     return this.http.post<string>(`${this.server}/PFE`, formData,{
//       observe:'response'
//     });
//   }

//       getAll(){
//         return this.http.get<PFE[]>(`${this.server}/PFE`);
//       }

//       AddProf(prof:Prof){
//         console.log(prof)
//         let headers = new HttpHeaders();
//         headers.append('content-type', 'application/json');
//       headers.append('accept', 'application/json');
//         console.log("entrer")
//         return this.http.post<Prof>(`${this.server}/Professeur`,prof,{headers: headers});
//       }

//       getListPfeByIdProf(idProf:string){
//          return this.http.get<PFEfile[]>(`${this.server}/Professeur/pfe/${idProf}`)
//       }

//       update(formData,idpfe){
//         return this.http.put<string>(`${this.server}/PFE/update?idpfe=${idpfe}`, formData,{
//           observe:'response'
//         });
//       }

//       SendGroup(groupe:Group){
//         let headers = new HttpHeaders();
//         headers.append('content-type', 'application/json');
//         headers.append('accept', 'application/json');
//         console.log("entrer")
//         return this.http.post(`${this.server}/groupe`,groupe,{headers: headers});


//       }

//       getGroupProf(id:number){
//         return this.http.get<GroupPfe[]>(`${this.server}/Professeur/groupe/${id}`)
//       }

//     getProfTitre(email:string,niveux:string){
//       return this.http.get<PFE[]>(`${this.server}/PFE/PFE?idprof=${email}&niveux=${niveux}`)
//     }

//     getEtudiantGroup(email:string,niveux:string){
//       return this.http.get<Group[]>(`${this.server}/groupe/listEtudiant?idProf=${email}&niveux=${niveux}`)
//     }

//     mellangeGroupPfe(email:string,niveux:string){
//       return this.http.get(`${this.server}/PFE/melange?niveux=${niveux}&idprof=${email}`)

//     }

// }

export class ServicePfeService {
  private server = "http://localhost:8084";
  constructor(private http:HttpClient) { }


  upload(formData:string){
    return this.http.post<string>(`${this.server}/PFE`, formData,{
      observe:'response'
    });
  }

      getAll(){
        return this.http.get<PFE[]>(`${this.server}/PFE`);
      }

      AddProf(prof:Prof){
        console.log(prof)
        let headers = new HttpHeaders();
        headers.append('content-type', 'application/json');
      headers.append('accept', 'application/json');
        console.log("entrer")
        return this.http.post<Prof>(`${this.server}/Professeur`,prof,{headers: headers});
      }

      getListPfeByIdProf(idProf:string){
         return this.http.get<PFEfile[]>(`${this.server}/Professeur/pfe/${idProf}`)
      }

      update(formData,idpfe){
        return this.http.put<string>(`${this.server}/PFE/update?idpfe=${idpfe}`, formData,{
          observe:'response'
        });
      }

      SendGroup(groupe:Group){
        let headers = new HttpHeaders();
        headers.append('content-type', 'application/json');
        headers.append('accept', 'application/json');
        console.log("entrer")
        return this.http.post(`${this.server}/groupe`,groupe,{headers: headers});


      }

      getGroupProf(id:string){
        return this.http.get<GroupPfe[]>(`${this.server}/Professeur/groupe/${id}`) 
      }
  

      getPfeGroup(email:string){
        return this.http.get<GroupPfe>(`${this.server}/groupe/${email}`) 
      }

      
     mellangeGroupPfe(email:string,niveux:string){
      return this.http.get(`${this.server}/PFE/melange?niveux=${niveux}&idprof=${email}`)

    }
        getEtudiantGroup(email:string,niveux:string){
      return this.http.get<Group[]>(`${this.server}/groupe/listEtudiant?idProf=${email}&niveux=${niveux}`)
    }
  
        getProfTitre(email:string,niveux:string){
      return this.http.get<PFE[]>(`${this.server}/PFE/PFE?idprof=${email}&niveux=${niveux}`)
    }

}
