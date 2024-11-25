import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a login al inicio
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) // Ruta para cargar HomeModule
  },
  
  {
    path: 'survey-details',
    loadChildren: () => import('./pages/survey-details/survey-details.module').then(m => m.SurveyDetailsModule) // Ruta correcta al módulo de la página
  },
  {
    path: 'survey-list',
    loadChildren: () => import('./pages/survey-list/survey-list.module').then(m => m.SurveyListModule) // Ruta para cargar HomeModule
  },

  

  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then(m => m.RecoverPasswordModule)
  },
  

  
  { path: 'survey', loadChildren: () => import('./pages/survey/survey.module').then(m => m.SurveyModule) },
  
  { path: '**', redirectTo: 'login' } // Ruta para manejar rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
