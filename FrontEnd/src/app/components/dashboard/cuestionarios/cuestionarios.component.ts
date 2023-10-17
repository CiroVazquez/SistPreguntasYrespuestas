import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent {

  nombreUsuario?: string;
  listCuestionarios: Cuestionario[] = [];
  loading = false;

  constructor(private loginService: LoginService, private cuestionarioService: CuestionarioService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getNombreUsuario();
    this.getCuestionarios();
  }

  getNombreUsuario(): void{
    this.nombreUsuario = this.loginService.getTokenDecode().sub;
  }

  getCuestionarios(): void{
    this.loading = true;
    this.cuestionarioService.getListCuestionarioByUser().subscribe(data => {
      this.listCuestionarios = data;
      console.log(data);
      this.loading = false;
    }, error =>{
      console.log(error);
      this.loading = false;
      this.toastr.error('Opss.. ocurrió un error', 'Error!');
    })
  }

  eliminarCuestionario(idCuestionario : number): void{
    if(confirm('¿Esta seguro que desea eliminar el cuestionario?')){
      this.loading = true;
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(data =>{
        this.loading = false;
        this.toastr.success('El cuestionario fue eliminado con exito!', 'Registro eliminado');
        this.getCuestionarios();
      }, error=>{
        this.loading = false;
        this.toastr.error('Opss.. ocurrió un error', 'Error!');
      })
    }
  }

}
