import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'loginuser', pathMatch: 'full' }, // Redirige a login al inicio
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
   path:  'registeruser',
    loadChildren: () => import('./pages/UserView/register-user/register-user.module').then(m => m.RegisterUserModule)
  },

  {
    path: 'loginuser',
    loadChildren: () => import('./pages/UserView/login-user/login-user.module').then(m => m.LoginUserModule)
  },

  {
    path: 'homeuser',
    loadChildren: () => import('./pages/UserView/home-user/home-user.module').then(m => m.HomeUserModule)
  },

  {
    path: 'answer',
    loadChildren: () => import('./pages/UserView/answer-survey/answer-survey.module').then(m => m.AnswerSurveyModule)
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
