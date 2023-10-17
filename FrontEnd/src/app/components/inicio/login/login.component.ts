import { Usuario } from 'src/app/models/usuario';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: FormGroup;
  loading = false;

  constructor(private fb:FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private toastr : ToastrService ){
    this.login = this.fb.group({
      usuario: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

log(): void {

  const usuario: Usuario = {
    nombreUsuario : this.login.value.usuario,
    password : this.login.value.password
  };

  this.loading = true;

  this.loginService.login(usuario).subscribe(data =>{
    console.log(data);
    this.loading = false;
    this.loginService.setLocalStorage(data.token);
    this.router.navigate(['/dashboard/cuestionario'])
  }, error =>{
    console.log(error);
    this.login.reset();
    this.toastr.error(error.error.message, 'Error!');
    this.loading = false;
  })


}

}
