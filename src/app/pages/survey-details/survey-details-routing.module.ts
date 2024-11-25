import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyDetailsComponent } from './survey-details.component';

const routes: Routes = [
  {
    path: ':id', // El ID de la encuesta será dinámico
    component: SurveyDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyDetailsRoutingModule {}
