import { Injectable } from '@angular/core';
import { User } from '../model/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    baseUrl:string='http://localhost:8084'
    constructor(private http: HttpClient) { }

    

    conferme(channel:string,idpfe:number){
        return this.http.get(this.baseUrl+`/PFE/conferme?pfe_id=${idpfe}&channel=${channel}`)
    }

    findUsers(role,username) {
        console.log("hero")
        return this.http.get(this.baseUrl + `/${role}/listUsers?username=${username}`, { headers: headers });
    }
}
