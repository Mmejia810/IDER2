import { Component, OnInit } from '@angular/core';
import { Survey } from '../../../models/surveyModels';
import { SurveyService } from '../../../services/survey.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer-survey',
  templateUrl: './answer-survey.component.html',
  styleUrl: './answer-survey.component.css'
})
export class AnswerSurveyComponent implements OnInit{
  surveyDetails: any = {};
  secciones: any[] = [];
  preguntas: any[] = [];
  opciones: any[] = [];
  selectedSection: any = null; // Sección seleccionada
  encuestaId: string | null = '';

  constructor(private surveyService: SurveyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.encuestaId = this.route.snapshot.paramMap.get('id');
    if (this.encuestaId) {
      this.loadSurveyDetails(this.encuestaId);
    }
  }

  loadSurveyDetails(id: string): void {
    this.surveyService.getSurveyDetails(id).subscribe(
      (response) => {
        this.surveyDetails = response[0]; // Encuesta
        this.secciones = this.filterSections(response[1], id); // Secciones asociadas a la encuesta
        this.opciones = response[3]; // Cargar todas las opciones de la encuesta
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

}
