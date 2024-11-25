import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute } from '@angular/router';

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
  encuestaId: string | null = '';
  isSidebarActive: boolean = false;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute
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
        this.surveyDetails = response[0]; // Encuesta
        this.secciones = this.filterSections(response[1], id); // Filtrar las secciones
        this.preguntas = this.filterQuestions(response[2], id); // Filtrar las preguntas
        this.opciones = this.filterOptions(response[3], id); // Filtrar las opciones
        console.log('Secciones:', this.secciones);
        console.log('Preguntas:', this.preguntas);
        console.log('Opciones:', this.opciones);
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

  filterQuestions(preguntas: any[], encuestaId: string): any[] {
    return preguntas.filter(
      (pregunta) =>
        pregunta.seccionEncuesta?.encuesta?.id === parseInt(encuestaId)
    );
  }

  filterOptions(opciones: any[], encuestaId: string): any[] {
    return opciones.filter(
      (opcion) =>
        opcion.pregunta?.seccionEncuesta?.encuesta?.id === parseInt(encuestaId)
    );
  }

  // Función para obtener las opciones relacionadas con una pregunta específica
  getOptionsForQuestion(preguntaId: number): any[] {
    return this.opciones.filter((opcion) => opcion.pregunta?.id === preguntaId);
  }
}
