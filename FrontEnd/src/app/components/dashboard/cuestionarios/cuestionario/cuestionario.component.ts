import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent {

  idCuestionario: number;
  loading = false;
  cuestionario: any = {};

  constructor(private cuestionarioService: CuestionarioService, private aRoute: ActivatedRoute){//AxctivateRoute me permite ingresar al id

    this.idCuestionario = +this.aRoute.snapshot.paramMap.get('id')! ;
  } 

  ngOnInit(): void{
    this.getCuestionario();
  }

  getCuestionario(): void{
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data =>{
      console.log(data);
      this.cuestionario = data;
      this.loading = false;
    })
  }

}
