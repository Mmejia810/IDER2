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
  isSidebarActive: boolean = false; // Controla la visibilidad del sidebar

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit() {
    this.surveyService.getSurveys().subscribe(
      (data) => {
        console.log(data);
        this.surveys = data.map(survey => ({
          ...survey,
          createdAt: survey.createdAt || new Date()
        }));
      },
      (error) => {
        console.error('Error al obtener las encuestas', error);
      }
    );
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  /**
   * Método para navegar a diferentes rutas.
   * @param route - Ruta a la que se desea navegar.
   */
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
    this.toggleSidebar(); // Cierra el sidebar después de navegar
  }

  logOut() {
    this.router.navigate(['/login'])
  }

  createSurvey() {
    this.router.navigate(['/create-survey']);
  }
}
