import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


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
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]  // <-- protegemos esta ruta
  },
  {
    path: 'survey-details',
    loadChildren: () => import('./pages/survey-details/survey-details.module').then(m => m.SurveyDetailsModule),
    canActivate: [AuthGuard]  // <-- protegemos esta ruta
  },



  {
    path: 'survey-list',
    loadChildren: () => import('./pages/survey-list/survey-list.module').then(m => m.SurveyListModule) // Ruta para cargar HomeModule
  },

  {
    path: 'homeuser',
    loadChildren: () => import('./pages/UserView/home-user/home-user.module').then(m => m.HomeUserModule)
  },

  {
    path: 'answer',
    loadChildren: () => import('./pages/answer-survey/answer-survey.module').then(m => m.AnswerSurveyModule)
  },

  {
    path: 'user-sur-details',
    loadChildren: () => import('./pages/usersurvey-lis/usersurvey-lis.module').then(m => m.UserSurveyLisModule)

  },

    {
    path: 'update-survey',
    loadChildren: () => import('./pages/update-survey/update-survey.module').then(m => m.UpdateSurveyModule),
    canActivate: [AuthGuard]
  },

   {
    path: 'update-survey/:id',
    loadChildren: () => import('./pages/update-survey/update-survey.module').then(m => m.UpdateSurveyModule),
    canActivate: [AuthGuard]
  },


  {
    path: 'show-credentials',
    loadChildren: () => import('./pages/show-credentials/show-credentials.module').then(m => m.ShowCredentialsModule)
  },

  {
    path: 'responder-encuesta',
    loadChildren: () => import('./pages/responder-encuesta/responder-encuesta.module').then(m => m.ResponderEncuestaModule)
  },

  { path: 'survey', loadChildren: () => import('./pages/survey/survey.module').then(m => m.SurveyModule) },


  { path: 'update-user-profile', loadChildren: () => import('./pages/update-user-profile/update-user-profile.module').then(m => m.UpdateUserProfileModule) },
  { path: 'encuestas-tabla', loadChildren: () => import('./pages/encuestas-tabla/encuestas-tabla.module').then(m => m.EncuestasTablaModule) },

  { path: '**', redirectTo: 'login' } // Ruta para manejar rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
