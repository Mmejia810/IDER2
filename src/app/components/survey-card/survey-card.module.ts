// src/app/survey-card/survey-card.module.ts (si el componente está en otro módulo)
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyCardComponent } from './survey-card.component';

@NgModule({
  declarations: [SurveyCardComponent],
  exports: [SurveyCardComponent],  // Exporta el componente para que sea accesible en otros módulos
  imports: [CommonModule],
})
export class SurveyCardModule {}
