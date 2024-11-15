// src/app/components/create-survey/create-survey.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSurveyComponent } from './create-survey.component';

@NgModule({
  declarations: [CreateSurveyComponent],
  imports: [CommonModule],
  exports: [CreateSurveyComponent],  // Exportar para que sea accesible en otros módulos
})
export class CreateSurveyModule {}