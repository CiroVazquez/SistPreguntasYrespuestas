import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   cant=0;
  listEstudiantes: any[] = [
    {nombre: 'Ciro Vazquez', estado: 'Promocionado'},
    {nombre: 'Lucas Perez', estado: 'Promocionado'},
    {nombre: 'Juan Garcia', estado: 'Regular'}
  ]
  mostrar = true;
  toogle(): void{
    this.mostrar= !this.mostrar;
  }

  verificaEstudiante(){
     this.cant = this.listEstudiantes.length;
     return this.cant;
  }
}
