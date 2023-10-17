import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent {
  nombreParticipante = '';

  constructor(private route: Router, private respuestaCuestionario:RespuestaCuestionarioService){}

  ngOnInit():void{
    if(this.respuestaCuestionario.idCuestionario == null){
      this.route.navigate(['/inicio']);
      return;
    }
  }

  siguiente():void{
    
    this.respuestaCuestionario.nombreParticipante = this.nombreParticipante;
    this.route.navigate(['/inicio/pregunta']);
  }

}
