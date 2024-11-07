import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateModule } from './pages/survey/create/create.module';
import { UpdateModule } from './pages/survey/update/update.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then(m => m.RecoverPasswordModule)
  },

  {
    path: 'create',
    loadChildren: () => import ('./pages/survey/create/create.module').then(m => m.CreateModule)
  },

  {
    path: 'update/:id',  // Incluye el parámetro de ID para editar una encuesta específica
    loadChildren: () => import('./pages/survey/update/update.module').then(m => m.UpdateModule)
  },

{
  path: 'home',
  loadChildren: () => import ('./pages/home/home.module') .then(m => m.HomeModule)
},
  
  { path: '**', redirectTo: 'login' } // Para manejar rutas no encontradas
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
