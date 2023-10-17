import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/respuestaCuestionarioDetalle';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';
import { Respuesta } from '../../../../../models/respuesta';

@Component({
  selector: 'app-detalle-respuesta',
  templateUrl: './detalle-respuesta.component.html',
  styleUrls: ['./detalle-respuesta.component.css']
})
export class DetalleRespuestaComponent {
  idRespuesta: number;
  loading = false;
  cuestionario?: Cuestionario;
  respuestas: RespuestaCuestionarioDetalle[] = [];

  constructor(private aRoute:ActivatedRoute, private respuestaCuestionarioService: RespuestaCuestionarioService){
    const idFromRoute = this.aRoute.snapshot.paramMap.get('id');
    this.idRespuesta = idFromRoute ? +idFromRoute : 0; 

  }

  ngOnInit():void{
    this.getListRespuestasYcuestionario();
  }

  getListRespuestasYcuestionario():void{
    this.loading = true
    this.respuestaCuestionarioService.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(data=>{
      console.log(data);
      this.cuestionario = data.cuestionario;
      this.respuestas = data.respuestas;
      this.loading = false;
    })
  }

}
