import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuestionarioService } from 'src/app/services/cuestionario.service';


@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.css']
})
export class PasoUnoComponent {

  datosCuestionario: FormGroup;

  constructor(private fb:FormBuilder, private Route: Router, private cuestionarioServices: CuestionarioService){
    this.datosCuestionario = fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  pasoUno(): void{
    this.cuestionarioServices.tituloCuestionario = this.datosCuestionario.value.titulo;
    this.cuestionarioServices.descripcionCuestionario = this.datosCuestionario.value.descripcion;
    this.Route.navigate(['/dashboard/nuevoCuestionario/pasoDos'])
  }

}
