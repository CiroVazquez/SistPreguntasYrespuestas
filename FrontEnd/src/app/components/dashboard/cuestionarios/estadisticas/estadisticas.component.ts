import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {
  idCuestionario?: number;
  loading=false;
  listRespuestaCuestionario: RespuestaCuestionario[] = [];

  constructor(private aRoute: ActivatedRoute, private respuestaCuestionarioService: RespuestaCuestionarioService, private toastr: ToastrService){

    const idFromRoute = this.aRoute.snapshot.paramMap.get('id');
    this.idCuestionario = idFromRoute ? +idFromRoute : 0; 
  }  

  ngOnInit():void{
    this.getListCuestionarioService();
  }

  getListCuestionarioService(): void{
    this.loading =true;
    this.respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionario??0).subscribe(data=>{
      this.loading=false;
      this.listRespuestaCuestionario=data;
      console.log(data);
    });
  }

  eliminarRespuestaCuestionario(idRtaCuestionario:number): void{
    this.loading=true;
    this.respuestaCuestionarioService.eliminarRespuestaCuestionario(idRtaCuestionario).subscribe(data=>{
      this.loading=false;
      this.toastr.success('La respuesta al cuestionario fue eliminada con exito', 'Registro eliminado');
      this.getListCuestionarioService();
    }, error =>{
      this.loading=false;
    });
  }

  




}


