import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Pregunta } from 'src/app/models/pregunta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent {

  tituloCuestionario?: string;
  descripcionCuestionario?: string;
  listPregunta: Pregunta[] = [];
  loading = false;

  constructor(private cuestionarioService: CuestionarioService, private toastr: ToastrService, private route: Router){
     //enviamos cuestionario al backEnd
  }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
  }

  guardarPregunta(pregunta: Pregunta): void{
    this.listPregunta.push(pregunta);
  }

  eliminarPregunta(index:number): void{
    this.listPregunta.splice(index,1);
  }

  guardarCuestionario():void{
    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPregunta
    };

    this.loading = true;

    console.log(cuestionario);

    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(data =>{
      this.toastr.success('El cuestionario fue registrado con exito', 'Cuestionario Registrado');
      this.route.navigate(['/dashboard']);
    }, error =>{

      this.toastr.error('Opps.. Ocurrio un error!', 'Error');
      this.route.navigate(['/dashboard']);
    });

  }







}
