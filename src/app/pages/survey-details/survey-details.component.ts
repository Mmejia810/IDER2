import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css'],
})
export class SurveyDetailsComponent implements OnInit {
  surveyDetails: any = {};
  secciones: any[] = [];
  preguntas: any[] = [];
  opciones: any[] = [];
  selectedSection: any = null; 
  encuestaId: string | null = '';
  isSidebarActive: boolean = false;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.encuestaId = this.route.snapshot.paramMap.get('id');
    if (this.encuestaId) {
      this.loadSurveyDetails(this.encuestaId);
    }
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  loadSurveyDetails(id: string): void {
    this.surveyService.getSurveyDetails(id).subscribe(
      (response) => {
        this.surveyDetails = response[0]; 
        this.secciones = this.filterSections(response[1], id); 
        this.opciones = response[3]; 
        console.log('Secciones:', this.secciones);
      },
      (error) => {
        console.error('Error al obtener los detalles de la encuesta:', error);
      }
    );
  }

  filterSections(secciones: any[], encuestaId: string): any[] {
    return secciones.filter(
      (seccion) => seccion.encuesta?.id === parseInt(encuestaId)
    );
  }

  loadQuestionsForSection(sectionId: number): void {
    this.selectedSection = this.secciones.find(
      (seccion) => seccion.id === sectionId
    );

    if (this.selectedSection) {
      this.surveyService.getQuestions().subscribe(
        (allQuestions) => {
          this.preguntas = allQuestions.filter(
            (pregunta) => pregunta.seccionEncuesta?.id === sectionId
          );
          console.log(`Preguntas de la sección ${sectionId}:`, this.preguntas);
        },
        (error) => {
          console.error(
            'Error al obtener las preguntas de la sección:',
            error
          );
        }
      );
    }
  }

  getOptionsForQuestion(preguntaId: number): any[] {
    return this.opciones.filter((opcion) => opcion.pregunta?.id === preguntaId);
  }
  logOut() {
    this.router.navigate(['/login']);
  }
  
}
