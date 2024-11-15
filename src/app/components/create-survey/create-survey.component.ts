import { Component } from '@angular/core';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent {

  // Asegúrate de que el método esté definido
  createNewSurvey() {
    // Lógica para crear una nueva encuesta
    console.log("Nueva encuesta creada");
  }
}