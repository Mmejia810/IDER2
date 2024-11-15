import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/surveyModels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  surveys: Survey[] = [];
  isSidebarActive: boolean = false;
  greetingMessage: string = ''; // Mensaje de saludo

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit() {
    this.surveyService.getSurveys().subscribe(
      (data) => {
        console.log(data);
        this.surveys = data.map(survey => ({
          ...survey,
          createdAt: survey.createdAt || new Date().toISOString() // Asigna la fecha actual si no existe 'createdAt'
        }));
      },
      (error) => {
        console.error('Error al obtener las encuestas', error);
      }
    );
  
    this.setGreetingMessage(); // Establece el mensaje de saludo
  }
  

  setGreetingMessage() {
    const hour = new Date().getHours();
    let timeOfDay = 'día'; // Establecer valor predeterminado

    // Condición para la tarde
    if (hour >= 12 && hour < 18) {
      timeOfDay = 'tarde';
    } 
    // Condición para la noche
    else if (hour >= 18 || hour < 6) {
      timeOfDay = 'noche';
    }

    // Cambiar el mensaje según la hora
    if (timeOfDay === 'día') {
      this.greetingMessage = `Bienvenido a la creación de encuestas. ¡Ten un excelente día!`;
    } else {
      this.greetingMessage = `Bienvenido a la creación de encuestas. ¡Ten una excelente ${timeOfDay}!`;
    }
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
    this.toggleSidebar();
  }

  logOut() {
    this.router.navigate(['/login']);
  }

  createSurvey() {
    this.router.navigate(['/survey']);
  }
}
