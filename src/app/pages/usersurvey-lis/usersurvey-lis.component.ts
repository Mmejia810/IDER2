import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usersurvey-lis',
  templateUrl: './usersurvey-lis.component.html',
  styleUrls: ['./usersurvey-lis.component.css']
})
export class UsersurveyLisComponent implements OnInit {
  respuestas: { [key: number]: any } = {}; // Para guardar las respuestas de cada pregunta
  respuestaAbierta: { [key: number]: string } = {}; // Respuestas abiertas por pregunta
  comentarios: { [key: number]: string } = {}; // Para almacenar los comentarios
  surveyDetails: any = {};
  secciones: any[] = [];
  preguntas: any[] = [];
  opciones: any[] = [];
  selectedSection: any = null;
  encuestaId: string = ''; // Cambiado a string vacío por defecto
  isSidebarActiveU: boolean = false;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Método para cambiar el estado de la barra lateral
  toggleSidebarU() {
    this.isSidebarActiveU = !this.isSidebarActiveU;
  }

  // Método para cargar los detalles de la encuesta
  ngOnInit(): void {
    this.encuestaId = this.route.snapshot.paramMap.get('id') || ''; // Aseguramos que sea una cadena vacía si es null
  
    // Verificar si encuestaId no es vacío antes de llamar a loadSurveyDetails
    if (this.encuestaId) {
      this.loadSurveyDetails(this.encuestaId); // Ahora `encuestaId` es un string no vacío
    } else {
      console.error('El ID de la encuesta no se encuentra en la URL');
      // Puedes redirigir o mostrar un mensaje de error si no hay ID
    }
  }

  // Método para cargar los detalles de la encuesta
  loadSurveyDetails(id: string): void {
    this.surveyService.getSurveyDetails(id).subscribe(
      (response) => {
        this.surveyDetails = response[0];
        this.secciones = this.filterSections(response[1], id);
        this.opciones = response[3];
      },
      (error) => {
        console.error('Error al obtener los detalles de la encuesta:', error);
      }
    );
  }

  // Método para filtrar las secciones de acuerdo al id de la encuesta
  filterSections(secciones: any[], encuestaId: string): any[] {
    return secciones.filter(
      (seccion) => seccion.encuesta?.id === parseInt(encuestaId, 10)
    );
  }

  // Método para cargar las preguntas de una sección
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
        },
        (error) => {
          console.error('Error al obtener las preguntas de la sección:', error);
        }
      );
    }
  }

  // Método para obtener las opciones de una pregunta
  getOptionsForQuestion(preguntaId: number): any[] {
    return this.opciones.filter((opcion) => opcion.pregunta?.id === preguntaId);
  }

  // Método para manejar el cambio de opción seleccionada
  onOptionChange(pregunta: any, opcionId: number, event: any): void {
    if (!pregunta.opcionesSeleccionadas) {
      pregunta.opcionesSeleccionadas = [];
    }

    if (event.target.checked) {
      // Añadir el ID de la opción seleccionada
      if (opcionId != null && !pregunta.opcionesSeleccionadas.includes(opcionId)) {
        pregunta.opcionesSeleccionadas.push(opcionId);
      }
    } else {
      // Eliminar el ID de la opción desmarcada
      const index = pregunta.opcionesSeleccionadas.indexOf(opcionId);
      if (index !== -1) {
        pregunta.opcionesSeleccionadas.splice(index, 1);
      }
    }
  }

  saveAnswer(preguntas: any[]): void {
    const respuestasParaEnviar: any[] = [];
  
    preguntas.forEach((pregunta) => {
      const respuesta: any = {
        respuesta: '',
        usuario: { id: 1 },  // Aquí puedes ajustar para usar el ID del usuario actual
        seccionEncuesta: { id: this.selectedSection.id },  // Asegúrate de que solo envíes el ID
        pregunta: { id: pregunta.id },
        opciones: [],
      };
  
      if (pregunta.tipo === 'Abierta') {
        // Asegúrate de que no se envíe una respuesta vacía
        respuesta.respuesta = this.respuestaAbierta[pregunta.id]?.trim() || ''; 
      } else if (pregunta.tipo === 'Opcion multiple') {
        if (pregunta.opcionesSeleccionadas?.length > 0) {
          // Si hay opciones seleccionadas, las agregamos al array
          respuesta.opciones = pregunta.opcionesSeleccionadas.map((opcionId: number) => ({ id: opcionId }));
        }
      }
  
      // Verifica que la respuesta no esté vacía antes de agregarla
      if (respuesta.respuesta || respuesta.opciones.length > 0) {
        respuestasParaEnviar.push(respuesta);
      }
    });
  
    // Si hay respuestas para enviar
    if (respuestasParaEnviar.length > 0) {
      this.surveyService.saveResponses(this.encuestaId, respuestasParaEnviar).subscribe(
        (response) => {
          console.log('Respuestas guardadas exitosamente:', response);
        },
        (error) => {
          console.error('Error al guardar respuestas:', error);
          // Agregar una alerta o mensaje al usuario para que sepa si ocurrió un error
        }
      );
    } else {
      console.warn('No hay respuestas para guardar');
    }
  }
  
}