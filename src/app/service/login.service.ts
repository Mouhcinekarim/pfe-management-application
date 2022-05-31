import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { map, Observable, tap, throwError } from 'rxjs';
import { Connexion } from '../model/connexion';
import { ConnexionResponse } from '../model/connexionResponse';
import { Inscription } from '../model/inscription';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() email: EventEmitter<string> = new EventEmitter();


  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    email: this.getEmail()
  }

  urlApi= 'http://localhost:8080/api/auth';

  constructor(private http : HttpClient, private localStorage:LocalStorageService) { }

  ListEmailsNonVerifier():Observable<any>{
    return this.http.get<Connexion>(`${this.urlApi}/unverified`);
  }

  // inscription

  Inscription(inscription : Inscription):Observable<any>{
    const response:object={
      responseType:'text'
    }
    return this.http.post<Inscription>(`${this.urlApi}/signup`,inscription, response);
  // response Type: text ?
  }

  // connexion
  Connexion(connexion : Connexion):Observable<boolean>{
    var res = this.http.post<ConnexionResponse>(`${this.urlApi}/login`, connexion)
    .pipe(map(
      data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('email', data.email);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        this.loggedIn.emit(true);
        this.email.emit(data.email);

        return true;
      }
    ));
    return res;
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refrechToken() {
    return this.http.post<ConnexionResponse>(`${this.urlApi}/refresh/token`,
    this.refreshTokenPayload)
    .pipe(tap(response => {
      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('expiresAt');

      this.localStorage.store('authenticationToken',
        response.authenticationToken);
      this.localStorage.store('expiresAt', response.expiresAt);
    }));
  }

  logout() {
    this.http.post(`${this.urlApi}/logout`, this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('email');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getEmail() {
    return this.localStorage.retrieve('email');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
