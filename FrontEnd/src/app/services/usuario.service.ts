//Esta clase es la que me va permitir conectarme con el backend

import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroments';
import { Observable } from 'rxjs'; //no pertenece al equipo angular, es una libreria creada por microsoft

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { //inyecto a traves de inyeccion de dependencias la clase httpClient, habiendo importado el modulo en app.module, que me servira para conectarme a mi back
    this.myAppUrl = enviroment.endpoint;//creo el servicio enviroment, porque voy a compartirlo y lo importo aca
    this.myApiUrl = '/api/Usuario'; //esta es la direccion de la api del backend
  }

  saveUser(usuario: Usuario): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`+'/ingresarUsuario', usuario);
  }

  changePassword(changePassword: string): Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}`+'/CambiarPassword', changePassword)
  }
}
