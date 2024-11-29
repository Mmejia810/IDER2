import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 

@Component({
  selector: 'app-usersurvey-lis',
  templateUrl: './usersurvey-lis.component.html',
})
export class UsersurveyLisComponent implements OnInit {
  respuestas: { [key: number]: any } = {}; // Respuestas de opción
  respuestaAbierta: { [key: number]: string } = {}; // Respuestas abiertas
  comentarios: { [key: number]: string } = {}; // Comentarios
  surveyDetails: any = {}; // Detalles de la encuesta
  secciones: any[] = []; // Secciones de la encuesta
  preguntas: any[] = []; // Preguntas de las secciones
  opciones: any[] = []; // Opciones de respuesta
  selectedSection: any = null;
  encuestaId: string = ''; // ID de la encuesta
  isSidebarActiveU: boolean = false;
  userId: number | null = null;  // Variable para almacenar el ID del usuario

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService  // Inyectamos el AuthService
  ) {}

  toggleSidebarU() {
    this.isSidebarActiveU = !this.isSidebarActiveU;
  }

  ngOnInit(): void {
    const userIdFromStorage = this.authService.getUserId();
    this.userId = userIdFromStorage ? Number(userIdFromStorage) : null; // Convertir el userId a número si existe, de lo contrario será null.

    if (!this.userId) {
      console.error('Usuario no autenticado');
      this.router.navigate(['/login']);  // Si no está autenticado, redirigir al login
      return;
    }
    console.log("ID de usuario autenticado:", this.userId);

    this.encuestaId = this.route.snapshot.paramMap.get('id') || '';
    console.log("ID de la encuesta desde la URL:", this.encuestaId);
  
    if (this.encuestaId) {
      this.loadSurveyDetails(this.encuestaId); 
    } else {
      console.error('El ID de la encuesta no se encuentra en la URL');
      this.router.navigate(['/encuestas']); // Redirige si no hay ID
    }
  }

  loadSurveyDetails(id: string): void {
    console.log("Cargando detalles para la encuesta con ID:", id);
    this.surveyService.getSurveyDetails(id).subscribe(
      (response) => {
        console.log('Detalles de la encuesta recibidos:', response);
        this.surveyDetails = response[0];
        this.secciones = this.filterSections(response[1], id);
        this.opciones = response[3];
      },
      (error) => {
        console.error('Error al obtener los detalles de la encuesta:', error);
        alert('No se pudo cargar la encuesta. Intente nuevamente.');
      }
    );
  }

  filterSections(secciones: any[], encuestaId: string): any[] {
    console.log("Filtrando secciones con el ID de encuesta:", encuestaId);
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
          console.log("Preguntas cargadas para la sección:", sectionId);
          this.preguntas = allQuestions.filter(
            (pregunta) => pregunta.seccionEncuesta?.id === sectionId
          );
        },
        (error) => {
          console.error('Error al obtener las preguntas de la sección:', error);
          alert('No se pudieron cargar las preguntas. Intente nuevamente.');
        }
      );
    }
  }

  onOptionChange(pregunta: any, opcionId: number, event: any): void {
    console.log("Cambio en opción de la pregunta:", pregunta.id, "Opción ID:", opcionId);
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
    console.log('Respuesta antes de enviar:', this.respuestaAbierta[pregunta.id]);
    const respuestaParaEnviar: any = {
      respuesta: this.respuestaAbierta[pregunta.id]?.trim() || '',
      usuario: { id: this.userId },  // Usamos el userId autenticado
      seccionEncuesta: { id: this.selectedSection?.id ?? -1 }, // Si no hay sección, asignamos un valor por defecto
      pregunta: { id: pregunta.id },
      opciones: [] // Opciones vacías para preguntas abiertas
    };
    
    if (!respuestaParaEnviar.respuesta) {
      alert('Debe escribir una respuesta antes de guardarla.');
      return;
    }
  
    this.surveyService.saveOpenQuestionResponse(
      respuestaParaEnviar.respuesta,
      this.userId!,
      this.selectedSection?.id ?? -1, // Usamos un valor por defecto si no hay sección
      pregunta.id
    ).subscribe(
      (response) => {
        console.log('Respuesta guardada exitosamente:', response);
        alert('Respuesta guardada correctamente.');
      },
      (error) => {
        console.error('Error al guardar la respuesta:', error);
        alert('Hubo un error al guardar la respuesta. Intente nuevamente.');
      }
    );
  }
  

  
  
  saveAnswerForMultipleChoiceQuestion(pregunta: any): void {
    const respuestaParaEnviar: any = {
      respuesta: "", // Para preguntas de opción múltiple, no es necesario texto adicional.
      usuario: { id: this.userId }, // Usamos el userId autenticado
      seccionEncuesta: { id: this.selectedSection?.id ?? -1 }, // Aseguramos que no sea null
      pregunta: { id: pregunta.id }, // ID de la pregunta
      opciones: [] // Opciones seleccionadas
    };
  
    if (pregunta.opcionesSeleccionadas?.length > 0) {
      respuestaParaEnviar.opciones = pregunta.opcionesSeleccionadas.map((opcionId: number) => ({ id: opcionId }));
    }
  
    if (respuestaParaEnviar.opciones.length === 0) {
      alert('Debe seleccionar al menos una opción.');
      return;
    }
  
    this.surveyService.saveMultipleChoiceQuestionResponse(
      respuestaParaEnviar.respuesta,   // String vacío, no necesario en preguntas de opción múltiple
      this.userId!,
      this.selectedSection?.id ?? -1,  // Usamos un valor por defecto si no hay sección
      pregunta.id,
      respuestaParaEnviar.opciones
    ).subscribe(
      (response) => {
        console.log('Respuesta guardada exitosamente:', response);
        alert('Respuesta guardada correctamente.');
      },
      (error) => {
        console.error('Error al guardar la respuesta:', error);
        alert('Hubo un error al guardar la respuesta. Intente nuevamente.');
      }
    );
  }
  
  

  getOptionsForQuestion(preguntaId: number): any[] {
    return this.opciones.filter((opcion) => opcion.pregunta?.id === preguntaId);
  }
}
