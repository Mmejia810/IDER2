 // src/app/components/survey-card/survey-card.component.ts
 import { Component, Input } from '@angular/core';
 import { Survey } from '../../models/surveyModels';  // Asegúrate de importar el tipo Survey
 
 @Component({
   selector: 'app-survey-card',
   templateUrl: './survey-card.component.html',
   styleUrls: ['./survey-card.component.css'],
 })
 export class SurveyCardComponent {
   @Input() survey: Survey | undefined;  // Declara la propiedad 'survey' como Input
 }