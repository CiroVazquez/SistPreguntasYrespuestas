import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroments';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = enviroment.endpoint,
    this.myApiUrl = '/api/Login'
  }

  login (usuario: Usuario): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, usuario);
  }

  setLocalStorage(data: string): void{
    localStorage.setItem('token',data);
  }

  getTokenDecode(): any {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken;
    }
  }


  removeLocalStorage(): void{
    localStorage.removeItem('token');
  }

  getToken(): string{
    return localStorage.getItem('token')??'';
  }


}
