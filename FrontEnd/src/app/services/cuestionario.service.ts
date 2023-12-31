import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroments';
import { Cuestionario } from '../models/cuestionario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CuestionarioService {
  tituloCuestionario?: string ;
  descripcionCuestionario?: string ;

  myAppUrl: string;
  miApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = enviroment.endpoint;
    this.miApiUrl = '/api/Cuestionario';
  }

  guardarCuestionario(cuestionario: Cuestionario): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.miApiUrl}`+'/RegistrarCuestionario', cuestionario);
  }

  getListCuestionarioByUser(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.miApiUrl}`+'/GetListCuestionarioByUser');
  }

  deleteCuestionario(idCuestionario: number): Observable<any>{
    return this.http.delete(`${this.myAppUrl}${this.miApiUrl}`+'/'+idCuestionario);
  }

  getCuestionario(idCuestionario: number): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.miApiUrl}`+'/'+idCuestionario);
  }

  getListCuestionarios(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.miApiUrl}`+'/GetListCuestionarios');
  }


}
