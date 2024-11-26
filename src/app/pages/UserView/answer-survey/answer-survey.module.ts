import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerSurveyComponent } from './answer-survey.component';
import { AnswerSurveyRoutingModule } from './answer-survey-routing.module';

@NgModule({
  declarations: [AnswerSurveyComponent],
  imports: [
    CommonModule,
    AnswerSurveyRoutingModule
  ],
  exports: [AnswerSurveyComponent]  // Exportamos el componente para que pueda ser usado en otros módulos
})
export class AnswerSurveyModule { }