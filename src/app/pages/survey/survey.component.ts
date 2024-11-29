  import { Component, OnInit } from '@angular/core';
  import { SurveyService } from '../../services/survey.service';
  import { Router } from '@angular/router';
  import { HttpErrorResponse } from '@angular/common/http';
  import { AuthService } from '../../auth/auth.service';

  interface Option {
    id?: number;
    texto: string;
    seleccionable: boolean;
  }

  interface Question {
    id? : number | null;
    text: string;
    type: 'abierta' | 'multiple';
    options: Option[];
  }

  interface Section {
    id: number | null;
    title: string;
    questions: Question[];
    showQuestionTypeSelector: boolean;
  }

  @Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.css'],
  })
  export class SurveyComponent implements OnInit {
    isSidebarActive = false;
    surveyId: number | null = null;
    surveyTitle = '';
    surveyDescription = '';
    startDate: string = '';
    endDate: Date | null = null;
    sections: Section[] = [];
    expandedSectionIndex: number | null = null;

    constructor(private surveyService: SurveyService, private router: Router, private authService: AuthService // Inyectar el servicio de autenticación
    ) {}

    ngOnInit() {
      const today = new Date();
      this.startDate = today.toISOString().slice(0, 10); // Formato: YYYY-MM-DD
    }

    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
    }

    isSurveyValid(): boolean {
      return (
        this.surveyTitle.trim() !== '' &&
        this.surveyDescription.trim() !== '' &&
        this.endDate !== null
      );
    }

    saveSurvey() {
      if (!this.isSurveyValid()) {
        alert('Debe rellenar todos los campos de la encuesta antes de guardarla.');
        return;
      }
    
      const formattedEndDate = this.endDate?.toISOString().slice(0, 10) || '';

      const userId = this.authService.getUserId(); 
    
      if (!userId) {
        alert('No se ha podido obtener el ID del usuario logueado.');
        return;
      }
    
      const newSurvey = {
        titulo: this.surveyTitle,
        descripcion: this.surveyDescription,
        estado: 'activa',
        fechaCierre: formattedEndDate,
        usuario: { id: userId }, 
      };
    
      this.surveyService.saveSurvey(newSurvey).subscribe(
        (response: any) => {
          this.surveyId = response.id; 
          alert('Encuesta guardada exitosamente.');
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          alert('Hubo un error al guardar la encuesta. Intente nuevamente.');
        }
      );
    }
    

    addSection() {
      if (!this.surveyId) {
        alert('Debe guardar la encuesta primero antes de agregar secciones.');
        return;
      }

      const newSection: Section = {
        id: null,
        title: '',
        questions: [],
        showQuestionTypeSelector: false,
      };

      this.sections.push(newSection);
    }

    saveSection(section: Section) {
    if (!this.surveyId) {
      alert('El ID de la encuesta no está disponible. Guarde la encuesta primero.');
      return;
    }

    if (!section.title.trim()) {
      alert('El título de la sección es obligatorio.');
      return;
    }

    const sectionData = {
      encuestaId: this.surveyId, 
      titulo: section.title,
    };

    this.surveyService.saveSection(this.surveyId, sectionData).subscribe( 
    
      (response: any) => {
        section.id = response.id; 
        alert('Sección guardada exitosamente.');
      },
      (error: HttpErrorResponse) => {
        console.error('Error al guardar la sección:', error);
        alert('Hubo un error al guardar la sección. Intente nuevamente.');
      }
    );
  }

    

    deleteSection(sectionId: number | null) {
      const sectionIndex = this.sections.findIndex((section) => section.id === sectionId);

      if (sectionIndex !== -1) {
        const section = this.sections[sectionIndex];

        if (section.id === null) {
          this.sections.splice(sectionIndex, 1);
          alert('Sección eliminada localmente.');
        } else {
          this.surveyService.deleteSection(section.id).subscribe(
            () => {
              this.sections.splice(sectionIndex, 1);
              alert('Sección eliminada de la base de datos.');
            },
            (error: HttpErrorResponse) => {
              console.error(error);
              alert('Hubo un error al eliminar la sección. Intente más tarde.');
            }
          );
        }
      } else {
        alert('Sección no encontrada.');
      }
    }

    openQuestionTypeSelector(sectionId: number | null) {
      if (sectionId === null) return;
      const section = this.sections.find((s) => s.id === sectionId);
      if (section) {
        section.showQuestionTypeSelector = !section.showQuestionTypeSelector;
      }
    }

    addOpenQuestionInput(sectionId: number | null) {
      if (sectionId === null) return;
      const section = this.sections.find((s) => s.id === sectionId);
      if (section) {
        section.questions.push({
          id: null,
          text: '',
          type: 'abierta',
          options: [],
        });
      }
    }

    addMultipleChoiceQuestionInput(sectionId: number | null) {
      if (sectionId === null) return;
      const section = this.sections.find((s) => s.id === sectionId);
      if (section) {
        section.questions.push({
          id: null,
          text: '',
          type: 'multiple',
          options: [],
        });
      }
    }

    addOption(sectionId: number | null, question: Question) {
      if (question.type === 'multiple') {
        question.options = question.options || []; 
        question.options.push({
          texto: '', 
          seleccionable: true, 
        });
      }
    }
    

    saveQuestion(sectionId: number | null, question: Question) {
      if (sectionId === null || !question.text.trim()) {
        alert('Debe rellenar la pregunta antes de guardarla.');
        return;
      }
    
    
        const questionData = {
          id: question.id || null, 
          texto: question.text.trim(),
          tipo: question.type === 'abierta' ? 'Opcion abierta' : 'Opcion multiple',
          seccionEncuesta: { id: sectionId }, 
        };
    
    
      this.surveyService.saveQuestion(questionData).subscribe(
        (response: any) => {
          question.id = response.id; 
          alert('Pregunta guardada con éxito.');
    
          if (question.type === 'multiple') {
            alert('Ahora puede agregar opciones para esta pregunta.');
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          alert('Ocurrió un error al guardar la pregunta. Revise los datos.');
        }
      );
    }
    

    deleteQuestion(sectionId: number | null, question: Question) {
      if (question.id === null || question.id === undefined) {
        const section = this.sections.find((s) => s.id === sectionId);
        if (section) {
          section.questions = section.questions.filter((q) => q !== question);
        }
        alert('Pregunta eliminada localmente.');
      } else {
        this.surveyService.deleteQuestion(question.id).subscribe(
          () => {
            const section = this.sections.find((s) => s.id === sectionId);
            if (section) {
              section.questions = section.questions.filter((q) => q.id !== question.id);
            }
            alert('Pregunta eliminada de la base de datos.');
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            alert('Hubo un error al eliminar la pregunta.');
          }
        );
      }
    }

    removeOption(sectionId: number | null, question: Question, optionIndex: number) {
      question.options.splice(optionIndex, 1);
    }
    saveOptions(question: Question) {
      if (!question?.id) {
        alert('La pregunta no está configurada correctamente. Guarde la pregunta antes de añadir opciones.');
        return;
      }
    
    
      const formattedOptions = question.options
        .map(option => ({
          tipo: 'Texto libre', 
          texto: option.texto?.trim() || '', 
          seleccionable: option.seleccionable,
          pregunta: { id: question.id }, 
        }))
        .filter(option => option.texto !== ''); 
    
      if (formattedOptions.length === 0) {
        alert('Debe ingresar al menos una opción válida.');
        return;
      }
    
      formattedOptions.forEach(option => {
        this.surveyService.saveOption(option).subscribe(
          (response: any) => {
            console.log('Opción guardada:', response);
            alert('Opción guardada correctamente.');
          },
          (error: HttpErrorResponse) => {
            console.error('Error al guardar opción:', error);
            alert('Error al guardar la opción. Revise los datos enviados.');
          }
        );
      });
    }
    
    
    
    
    logOut() {
      this.router.navigate(['/login']);
    }
  }