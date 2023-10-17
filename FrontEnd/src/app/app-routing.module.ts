import { NuevoCuestionarioComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CambiarPaswordComponent } from './components/dashboard/cambiar-pasword/cambiar-pasword.component';
import { CuestionariosComponent } from './components/dashboard/cuestionarios/cuestionarios.component';
import { PasoUnoComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso-uno/paso-uno.component';
import { PasoDosComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso-dos/paso-dos.component';
import { CuestionarioComponent } from './components/dashboard/cuestionarios/cuestionario/cuestionario.component';
import { ListCuestionariosComponent } from './components/inicio/list-cuestionarios/list-cuestionarios.component';
import { IngresarNombreComponent } from './components/inicio/list-cuestionarios/ingresar-nombre/ingresar-nombre.component';
import { PreguntaComponent } from './components/inicio/list-cuestionarios/pregunta/pregunta.component';
import { RespuestaCuestionarioComponent } from './components/inicio/list-cuestionarios/respuesta-cuestionario/respuesta-cuestionario.component';
import { EstadisticasComponent } from './components/dashboard/cuestionarios/estadisticas/estadisticas.component';
import { DetalleRespuestaComponent } from './components/dashboard/cuestionarios/estadisticas/detalle-respuesta/detalle-respuesta.component';

const routes: Routes = [
  {path:'', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent, children: [
    {path:'', component: BienvenidaComponent},
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path: 'listCuestionario', component: ListCuestionariosComponent},
    {path: 'ingresarNombre', component: IngresarNombreComponent},
    {path: 'pregunta', component: PreguntaComponent },
    {path: 'respuestaCuestionario', component: RespuestaCuestionarioComponent}

  ]},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'cambiarPassword', component: CambiarPaswordComponent},
    {path: 'verCuestionario/:id', component: CuestionarioComponent},
    {path: 'estadisticas/:id', component: EstadisticasComponent},
    {path: 'cuestionario', component: CuestionariosComponent},
    {path: 'detalleRespuesta/:id', component: DetalleRespuestaComponent},
    {path: 'nuevoCuestionario', component: NuevoCuestionarioComponent, children: [
      {path: 'pasoUno', component: PasoUnoComponent},
      {path: 'pasoDos', component: PasoDosComponent}
    ]}
  ]},
  {path:'**', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
