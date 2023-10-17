import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-respuesta-cuestionario',
  templateUrl: './respuesta-cuestionario.component.html',
  styleUrls: ['./respuesta-cuestionario.component.css']
})


export class RespuestaCuestionarioComponent {
  cuestionario?: Cuestionario;
  respuestaUsuario: number[] = [];
  
  constructor(private respuestaCuestionarioService: RespuestaCuestionarioService, private route: Router ){

  }

ngOnInit():void{
  if(this.respuestaCuestionarioService.idCuestionario==null){
    this.route.navigate(['/inicio']);
  }else{
    this.cuestionario = this.respuestaCuestionarioService.cuestionario;
    this.respuestaUsuario = this.respuestaCuestionarioService.respuestas;
    // console.log(this.cuestionario);
    // console.log(this.respuestaUsuario);
  }
}


}
