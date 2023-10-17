import { UsuarioService } from './../../../services/usuario.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  register: FormGroup //creo una nueva variable de tipo FormGroup
  loading = false;

  constructor(private fb:FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private toastr : ToastrService){ //En el constructor inicializo la variable y a traves de inyeccion de dependencia creo una variable fb:FormBuilder, que nos va a ayudar a construir el objeto
    this.register = this.fb.group({ //esta variable va a ser de tipo group porque voy a tener una serie de elementos "inputs"
      usuario: ['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(4) ]],
      confirmPassword: ['']
    }, {validator: this.chekPassword})

  }

  chekPassword(group: FormGroup): any{
    const pass = group.controls['password']. value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null: {notSame: true};
  }

  registrarUsuario(){
    // console.log(this.register);

    const usuario: Usuario ={
      nombreUsuario : this.register.value.usuario,
      password : this.register.value.password
    }
    this.loading = true;
    this.usuarioService.saveUser(usuario).subscribe(data =>{
      console.log(data);
      this.toastr.success('El usuario '+usuario.nombreUsuario+' fue registrado con exito', 'Usuario Registrado!');
      this.router.navigate(['/inicio/login']);
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
      this.toastr.error(error.error.message, 'Error!');
      this.register.reset();
    });

  }

}
