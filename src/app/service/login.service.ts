import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //Generar el token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //iniciamos sesion y guardamos token en local storage
  public loginUser(token:any) {
    localStorage.setItem('token',token);
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }

    return true;
  }

  //cerrar sesion y eliminar token
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtener token
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user:any) {
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');

    if (userStr!=null) {
      return JSON.parse(userStr);
    }

    this.logout();
    return null;
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/actual-usuario`);
  }

}
