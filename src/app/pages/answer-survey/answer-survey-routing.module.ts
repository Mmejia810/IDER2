
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerSurveyComponent } from './answer-survey.component';

const routes: Routes = [
  { path: '', component: AnswerSurveyComponent }, // Ruta principal para Home
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Usamos forChild porque es un módulo hijo
  exports: [RouterModule]
})
export class AnswerSurveyRoutingModule {}