import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-pasword',
  templateUrl: './cambiar-pasword.component.html',
  styleUrls: ['./cambiar-pasword.component.css']
})

export class CambiarPaswordComponent {

  cambiarPassword: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toast: ToastrService,
              private route: Router){
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    },{validator: this.chekPassword}) ;
  }

  chekPassword(group: FormGroup): any{
    const pass = group.controls['nuevaPassword'].value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null: {notSame: true}; //compara, si son iguales devuelve null, y sino, estamos creando un objeto con la propiedad notSame en true
  }

  guardarPassword():void{

    const changePassword: any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword
    }; //construyo el objeto

    console.log(changePassword);
    this.usuarioService.changePassword(changePassword).subscribe(data =>{ //le paso el objeto que he creado, "changePassword"
      this.toast.info(data.message);
      this.route.navigate(['dashboard/cuestionario']);
    }, error => {
      this.loading = false;
      this.toast.error(error.error.message, 'Error!');
    })
  }

}
