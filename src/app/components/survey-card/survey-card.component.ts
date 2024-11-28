 
 import { Component, Input } from '@angular/core';
 import { Survey } from '../../models/surveyModels';  
 
 @Component({
   selector: 'app-survey-card',
   templateUrl: './survey-card.component.html',
   styleUrls: ['./survey-card.component.css'],
 })
 export class SurveyCardComponent {
   @Input() survey: Survey | undefined;  
 }