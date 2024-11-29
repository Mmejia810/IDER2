import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usersurvey-lis',
  templateUrl: './usersurvey-lis.component.html',
  styleUrls: ['./usersurvey-lis.component.css']
})
export class UsersurveyLisComponent implements OnInit {
  comentarios: { [key: number]: string } = {};

  respuestas: any[] = [];
  surveyDetails: any = {};
  secciones: any[] = [];
  preguntas: any[] = [];
  opciones: any[] = [];
  selectedSection: any = null;
  encuestaId: string | null = '';
  isSidebarActiveU: boolean = false;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.encuestaId = this.route.snapshot.paramMap.get('id');
    if (this.encuestaId) {
      this.loadSurveyDetails(this.encuestaId);
    }
  }

  toggleSidebarU() {
    this.isSidebarActiveU = !this.isSidebarActiveU;
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
      (seccion) => seccion.encuesta?.id === parseInt(encuestaId, 10)
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

          // Inicializar las respuestas para preguntas abiertas
          this.preguntas.forEach((pregunta) => {
            if (pregunta.tipo === 'Abierta') {
              pregunta.respuestaAbierta = '';
              pregunta.respuestaAdicional = '';
              pregunta.comentario = '';
            }
          });

          console.log(`Preguntas de la sección ${sectionId}:`, this.preguntas);
        },
        (error) => {
          console.error('Error al obtener las preguntas de la sección:', error);
        }
      );
    }
  }

  getOptionsForQuestion(preguntaId: number): any[] {
    return this.opciones.filter((opcion) => opcion.pregunta?.id === preguntaId);
  }

  submitAnswers(): void {
    if (this.encuestaId) {
      // Preparar respuestas para enviar
      const respuestasParaEnviar = this.preguntas.map((pregunta) => ({
        preguntaId: pregunta.id,
        respuesta:
          pregunta.tipo === 'Abierta'
            ? {
                respuestaAbierta: pregunta.respuestaAbierta,
                respuestaAdicional: pregunta.respuestaAdicional,
                comentario: pregunta.comentario
              }
            : pregunta.respuesta
      }));

      // Enviar las respuestas al backend
      this.surveyService.saveResponses(this.encuestaId, respuestasParaEnviar).subscribe(
        (response) => {
          console.log('Respuestas enviadas correctamente:', response);
          alert('Tus respuestas han sido enviadas con éxito.');
        },
        (error) => {
          console.error('Error al enviar respuestas:', error);
          alert('Hubo un error al enviar las respuestas. Intenta nuevamente.');
        }
      );
    } else {
      console.error('No se encontró el ID de la encuesta para enviar respuestas.');
      alert('No se encontró el ID de la encuesta.');
    }
  }

  isFormValid(): boolean {
    return this.preguntas.every(
      (pregunta) =>
        (pregunta.tipo === 'Opcion multiple' && pregunta.respuesta) ||
        (pregunta.tipo === 'Abierta' &&
          pregunta.respuestaAbierta?.trim() !== '')
    );
  }

  logOut() {
    this.router.navigate(['/login']);
  }
}
