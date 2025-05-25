import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-usersurvey-lis',
  templateUrl: './usersurvey-lis.component.html',
})
export class UsersurveyLisComponent implements OnInit {
  respuestas: { [key: number]: any } = {};
  respuestaAbierta: { [key: number]: string } = {};
  comentarios: { [key: number]: string } = {};
  surveyDetails: any = {};
  secciones: any[] = [];
  preguntas: any[] = [];
  opciones: any[] = [];
  selectedSection: any = null;
  encuestaId: string = '';
  isSidebarActiveU: boolean = false;
  userId: number | null = null;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  toggleSidebarU() {
    this.isSidebarActiveU = !this.isSidebarActiveU;
  }

  ngOnInit(): void {
    const userIdFromStorage = this.authService.getUserId();
    this.userId = userIdFromStorage ? Number(userIdFromStorage) : null;

    if (!this.userId) {
      console.error('Usuario no autenticado');
      this.router.navigate(['/login']);
      return;
    }

    this.encuestaId = this.route.snapshot.paramMap.get('id') || '';

    if (this.encuestaId) {
      this.loadSurveyDetails(this.encuestaId);
    } else {
      console.error('El ID de la encuesta no se encuentra en la URL');
      this.router.navigate(['/encuestas']);
    }
  }

  loadSurveyDetails(id: string): void {
    this.surveyService.getSurveyDetails(id).subscribe({
      next: (response) => {
        this.surveyDetails = response[0];
        this.secciones = this.filterSections(response[1], id);
        this.opciones = response[3];
      },
      error: () => {
        alert('No se pudo cargar la encuesta. Intente nuevamente.');
      }
    });
  }

  filterSections(secciones: any[], encuestaId: string): any[] {
    return secciones.filter(
      (seccion) => seccion.encuesta?.id === parseInt(encuestaId, 10)
    );
  }

 loadQuestionsForSection(sectionId: number): void {
    this.selectedSection = this.secciones.find((seccion) => seccion.id === sectionId);

    if (this.selectedSection) {
      this.surveyService.getQuestions().subscribe(
        (allQuestions) => {
          this.preguntas = allQuestions.filter(
            (pregunta) => pregunta.seccionEncuesta?.id === sectionId
          );
        },
        (error) => {
          alert('No se pudieron cargar las preguntas. Intente nuevamente.');
        }
      );
    }
  }

  onOptionChange(pregunta: any, opcionId: number, event: any): void {
    if (!pregunta.opcionesSeleccionadas) {
      pregunta.opcionesSeleccionadas = [];
    }

    if (event.target.checked) {
      if (opcionId != null && !pregunta.opcionesSeleccionadas.includes(opcionId)) {
        pregunta.opcionesSeleccionadas.push(opcionId);
      }
    } else {
      const index = pregunta.opcionesSeleccionadas.indexOf(opcionId);
      if (index !== -1) {
        pregunta.opcionesSeleccionadas.splice(index, 1);
      }
    }
  }

  saveAnswerForOpenQuestion(pregunta: any): void {
    const respuestaTexto = this.respuestaAbierta[pregunta.id]?.trim() || '';

    if (!respuestaTexto) {
      alert('Debe escribir una respuesta antes de guardarla.');
      return;
    }

    const respuestaParaEnviar = {
      usuario: { id: this.userId },
      seccionEncuesta: { id: this.selectedSection?.id ?? -1 },
      pregunta: { id: pregunta.id },
      opciones: [],
      respuesta: respuestaTexto
    };

    this.surveyService.saveResponse(respuestaParaEnviar).subscribe({
      next: () => alert('Respuesta guardada correctamente.'),
      error: () => alert('Hubo un error al guardar la respuesta.')
    });
  }

  saveAnswerForMultipleChoiceQuestion(pregunta: any): void {
  if (!pregunta.opcionesSeleccionadas || pregunta.opcionesSeleccionadas.length === 0) {
    alert('Debe seleccionar al menos una opción.');
    return;
  }

  const opcionesSeleccionadas = pregunta.opcionesSeleccionadas.map((id: number) => ({ id }));

  const respuestaParaEnviar = {
    usuario: { id: this.userId },
    seccionEncuesta: { id: this.selectedSection?.id ?? -1 },
    pregunta: { id: pregunta.id },
    opciones: opcionesSeleccionadas,
    respuesta: ''
  };

  console.log('Enviando respuesta:', respuestaParaEnviar);

  this.surveyService.saveResponse(respuestaParaEnviar).subscribe({
    next: () => alert('Respuesta guardada correctamente.'),
    error: (error) => {
      console.error('Error al guardar la respuesta:', error);
      alert('Hubo un error al guardar la respuesta.');
    }
  });
}


  saveAnswerForCommentQuestion(pregunta: any): void {
    const comentarioTexto = this.comentarios[pregunta.id]?.trim() || '';

    if (!comentarioTexto) {
      alert('Debe escribir un comentario antes de guardarlo.');
      return;
    }

    const respuestaParaEnviar = {
      usuario: { id: this.userId },
      seccionEncuesta: { id: this.selectedSection?.id ?? -1 },
      pregunta: { id: pregunta.id },
      opciones: [],
      respuesta: comentarioTexto
    };

    this.surveyService.saveResponse(respuestaParaEnviar).subscribe({
      next: () => alert('Comentario guardado correctamente.'),
      error: () => alert('Hubo un error al guardar el comentario.')
    });
  }

  getOptionsForQuestion(preguntaId: number): any[] {
    return this.opciones.filter((opcion) => opcion.pregunta?.id === preguntaId);
  }
}
