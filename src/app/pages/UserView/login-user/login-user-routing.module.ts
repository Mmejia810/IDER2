import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user.component';

const routes: Routes = [
  { path: '', component: LoginUserComponent } // Ruta vacía que carga el componente
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginUserRoutingModule { }
