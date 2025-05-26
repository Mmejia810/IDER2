import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Asegúrate de importar esto
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { Section, Question, Option } from '../../models/surveyModels';
import { ConfirmarEliminarDialogComponent } from '../../components/confirmar-eliminar-dialog/confirmar-eliminar-dialog.component';


@Component({
  selector: 'app-update-survey',
  templateUrl: './update-survey.component.html',
  styleUrls: ['./update-survey.component.css'],
})
export class UpdateSurveyComponent implements OnInit {
  surveys: any[] = [];
  filteredSurveys: any[] = [];
  selectedSurvey: any = null;
  surveyDetails: any = null;
  sections: Section[] = [];
  questions: Question[] = [];
  options: Option[] = [];
  isLoading: boolean = false;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
     private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id');
    if (surveyId) {
      this.loadSurveyDetails(surveyId);
      this.loadSurveySections(surveyId);
    } else {
      this.loadSurveys();
    }
  }

  loadSurveys(): void {
    this.isLoading = true;
    this.surveyService.getSurveys().subscribe(
      (data) => {
        this.surveys = data;
        this.filteredSurveys = [...this.surveys];
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar encuestas:', error);
        this.isLoading = false;
      }
    );
  }

  loadSurveyDetails(id: string): void {
    this.isLoading = true;
    this.surveyService.getSurveyDetails(id).subscribe(
      (response) => {
        console.log("Full response:", response);

        const [encuesta, secciones, preguntas, opciones] = response;

        console.log("Survey Details:", encuesta);
        console.log("Sections:", secciones);
        console.log("Questions:", preguntas);
        console.log("Options:", opciones);

        this.surveyDetails = encuesta;
        this.sections = secciones;
        this.questions = preguntas;
        this.options = opciones;

        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los detalles de la encuesta:', error);
        this.isLoading = false;
      }
    );
  }

  loadSurveySections(surveyId: string): void {
    this.isLoading = true;
    this.surveyService.getSectionsBySurveyId(surveyId).subscribe(
      (sections) => {
        this.sections = sections;

        // Cargar preguntas para cada sección
        this.sections.forEach(section => {
          this.surveyService.getQuestionBySeccionId(section.id).subscribe(
            (questions) => {
              section.questions = questions;
            },
            (error) => console.error(`Error al obtener preguntas de sección ${section.id}:`, error)
          );
        });

        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener las secciones:', error);
        this.isLoading = false;
      }
    );
  }

  loadQuestionsBySection(seccionId: number): void {
    this.isLoading = true;
    this.surveyService.getQuestionsBySection(seccionId.toString()).subscribe(
      (questions) => {
        const section = this.sections.find(s => s.id === seccionId);
        if (section) {
          section.questions = questions;
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener las preguntas:', error);
        this.isLoading = false;
      }
    );
  }

  getQuestionsBySection(sectionId: number): Question[] {
    return this.sections.find(section => section.id === sectionId)?.questions || [];
  }

  // ✅ MÉTODO AGREGADO PARA SOLUCIONAR EL ERROR
  getOptionsByQuestion(questionId: number): Option[] {
    return this.options.filter(opt => opt.questionId === questionId);
  }

  updateSurvey(): void {
    if (this.surveyDetails) {
      this.isLoading = true;
      this.surveyService.updateSurvey(this.surveyDetails).subscribe(
        () => {
          alert('Encuesta actualizada con éxito');
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al actualizar la encuesta:', error);
          this.isLoading = false;
        }
      );
    }
  }

  updateSection(section: Section): void {
    this.surveyService.updateSection(section).subscribe(
      () => alert(`Sección ${section.id} actualizada`),
      (error) => console.error('Error al actualizar la sección:', error)
    );
  }

  deleteSection(sectionId: number): void {
    if (confirm('¿Estás seguro de eliminar esta sección? Se eliminarán todas sus preguntas y opciones.')) {
      this.surveyService.deleteSection(sectionId).subscribe(
        () => {
          // Remover la sección de la lista local
          this.sections = this.sections.filter(sec => sec.id !== sectionId);

          // También eliminar preguntas y opciones relacionadas localmente para evitar inconsistencias
          this.questions = this.questions.filter(q => q.seccionId !== sectionId);
          this.options = this.options.filter(opt => {
            const question = this.questions.find(q => q.id === opt.questionId);
            return question !== undefined;
          });

          alert('Sección eliminada con éxito');
        },
        (error) => console.error('Error al eliminar la sección:', error)
      );
    }
  }

  updateQuestion(question: Question): void {
    this.surveyService.updateQuestion(question).subscribe(
      () => alert(`Pregunta ${question.id} actualizada`),
      (error) => console.error('Error al actualizar la pregunta:', error)
    );
  }

  deleteQuestion(questionId: number): void {
    if (confirm('¿Estás seguro de eliminar esta pregunta? Se eliminarán todas sus opciones.')) {
      console.log('Eliminando pregunta con ID:', questionId); // ← esto te dice si llega bien
      this.surveyService.deleteQuestion(questionId).subscribe(
        () => {
          // Eliminar pregunta localmente
          this.questions = this.questions.filter(q => q.id !== questionId);

          // Eliminar opciones relacionadas a esa pregunta localmente
          this.options = this.options.filter(opt => opt.questionId !== questionId);

          // También actualizar la sección que contenía esta pregunta
          this.sections.forEach(section => {
            if (section.questions) {
              section.questions = section.questions.filter(q => q.id !== questionId);
            }
          });

          alert('Pregunta eliminada con éxito');
        },
        (error) => console.error('Error al eliminar la pregunta:', error)
      );
    }
  }

  updateOption(option: Option): void {
    this.surveyService.updateOption(option).subscribe(
      () => alert(`Opción ${option.id} actualizada`),
      (error) => console.error('Error al actualizar la opción:', error)
    );
  }

  deleteOption(optionId: number): void {
    if (confirm('¿Estás seguro de eliminar esta opción?')) {
      this.surveyService.deleteOption(optionId).subscribe(
        () => {
          this.options = this.options.filter(opt => opt.id !== optionId);
          alert('Opción eliminada con éxito');
        },
        (error) => console.error('Error al eliminar la opción:', error)
      );
    }
  }

  goBackToSurveyList(): void {
    this.router.navigate(['/survey-list']);
  }

  navigateToSurveyDetails(surveyId: string): void {
    this.router.navigate(['/update-survey', surveyId]);
  }

   eliminarEncuesta(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta encuesta?')) {
      this.surveyService.eliminarEncuesta(id).subscribe({
        next: () => {
          alert('Encuesta eliminada correctamente');
          this.loadSurveys(); // Recargar lista actualizada
        },
        error: err => {
          console.error('Error al eliminar la encuesta', err);
          alert('Error al eliminar la encuesta');
        }
      });
    }
  }
  abrirConfirmacionEliminar(event: MouseEvent, id: number): void {
  event.stopPropagation(); // evita que se dispare el click de navegar

  const dialogRef = this.dialog.open(ConfirmarEliminarDialogComponent, {
    width: '300px'
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      this.surveyService.eliminarEncuesta(id).subscribe({
        next: () => {
          this.filteredSurveys = this.filteredSurveys.filter(e => e.id !== id);
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar la encuesta.');
        }
      });
    }
  });
}

}
