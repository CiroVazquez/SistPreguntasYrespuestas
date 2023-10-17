import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/respuestaCuestionarioDetalle';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent {
  idCuestionario!: number;
  listPreguntas: Pregunta[] = [];
  loading = false;
  rtaConfirmada = false;
  opcionSeleccionada: any;
  index = 0;
  idRespuestaSeleccionada?: number;

  listRespuestaDetalle: RespuestaCuestionarioDetalle[] = [];

  constructor(private respuestaCuestionarioService: RespuestaCuestionarioService, private cuestionarioService: CuestionarioService, private route: Router){}

  ngOnInit():void{
    this.idCuestionario = this.respuestaCuestionarioService.idCuestionario!;
    if(this.idCuestionario==null){
      this.route.navigate(['/inicio']);
      return;
    }
    this.getCuestionario();
    this.respuestaCuestionarioService.respuestas = [];
  }

  getCuestionario(): void{
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data =>{
      this.listPreguntas = data.listPreguntas;
      this.loading=false;
      this.respuestaCuestionarioService.cuestionario = data;
      ;
    })
  }

  obtenerPregunta(): string{
    return this.listPreguntas[this.index].descripcion;
  }

  getIndex():number{
    return this.index;
  }

  respuestaSeleccionada(respuesta: any, id:number): void{
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
    this.idRespuestaSeleccionada = id;
  }

  AddClassOption(respuesta: any): string{
    if(respuesta===this.opcionSeleccionada){
      return 'active text-light';
    }
    return '';
  }

  siguiente():void{
    this.respuestaCuestionarioService.respuestas.push(this.idRespuestaSeleccionada ?? 0);

    const detalleRespuesta: RespuestaCuestionarioDetalle = {      //creamos un objeto respuestaDetalle
      respuestaId: this.idRespuestaSeleccionada
    };
 
    this.listRespuestaDetalle.push(detalleRespuesta);       //agregamos objeto al array
    this.rtaConfirmada = false;
    this.index++;
    this.idRespuestaSeleccionada = 0;

    if(this.index === this.listPreguntas.length){
      this.route.navigate(['/inicio/respuestaCuestionario']);
      this.guardarRespuestaCuestionario();
    }
  }

  guardarRespuestaCuestionario(): void{
    const rtaCuestionario: RespuestaCuestionario = {
      CuestionarioId: this.respuestaCuestionarioService.idCuestionario,
      nombreParticipante: this.respuestaCuestionarioService.nombreParticipante,
      listRtaCuestionarioDetalle: this.listRespuestaDetalle
    };
    this.loading=true;
    console.log(rtaCuestionario);
    this.respuestaCuestionarioService.guardarRespuestaCuestionario(rtaCuestionario).subscribe(data =>{
      this.loading=false;
      this.route.navigate(['/inicio/respuestaCuestionario']);
    }, error =>{
      this.loading = false;
      console.log(error);
    })
  }

}
