import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyCardComponent } from './survey-card.component';

@NgModule({
  declarations: [SurveyCardComponent],
  exports: [SurveyCardComponent],  
  imports: [CommonModule],
})
export class SurveyCardModule {}
