import { Injectable } from '@angular/core';
import { Cuestionario } from '../models/cuestionario';
import { enviroment } from 'src/enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { RespuestaCuestionario } from '../models/respuestaCuestionario';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
//Almacenamos variables de componente a componente

export class RespuestaCuestionarioService {

  myAppUrl: string;
  myApiUrl: string;
  nombreParticipante?: string;
  idCuestionario?: number;
  respuestas: number[] = [];
  cuestionario?: Cuestionario;
  
  constructor(private http: HttpClient) { 
    this.myAppUrl = enviroment.endpoint;
    this.myApiUrl = '/api/RespuestaCuestionario/';
  }

  guardarRespuestaCuestionario(respuestaCuestionario: RespuestaCuestionario): Observable<any> {
    return this.http.post(this.myAppUrl+this.myApiUrl, respuestaCuestionario);
  }

  getListCuestionarioRespuesta(idCuestionario: number): Observable<any>{
    return this.http.get(this.myAppUrl+this.myApiUrl+idCuestionario);
  }

  eliminarRespuestaCuestionario(idRespuestaCuestionario: number): Observable<any>{
    return this.http.delete(this.myAppUrl+this.myApiUrl+idRespuestaCuestionario);
  }

  getCuestionarioByIdRespuesta(idRespuesta: number): Observable<any> {
    console.log(idRespuesta);
    return this.http.get(this.myAppUrl+this.myApiUrl+'GetCuestionarioByIdRespuesta/'+idRespuesta);
  }

}
