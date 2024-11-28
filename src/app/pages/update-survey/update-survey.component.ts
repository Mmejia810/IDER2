import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { Section, Question, Option } from '../../models/surveyModels';  

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
    private router: Router
  ) {}

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id');
    if (surveyId) {
      this.loadSurveyDetails(surveyId);
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
    this.surveyService.deleteSection(sectionId).subscribe(
      () => this.sections = this.sections.filter(sec => sec.id !== sectionId),
      (error) => console.error('Error al eliminar la sección:', error)
    );
  }

  updateQuestion(question: Question): void {
    this.surveyService.updateQuestion(question).subscribe(
      () => alert(`Pregunta ${question.id} actualizada`),
      (error) => console.error('Error al actualizar la pregunta:', error)
    );
  }

  deleteQuestion(questionId: number): void {
    this.surveyService.deleteQuestion(questionId).subscribe(
      () => this.questions = this.questions.filter(q => q.id !== questionId),
      (error) => console.error('Error al eliminar la pregunta:', error)
    );
  }

  updateOption(option: Option): void {
    this.surveyService.updateOption(option).subscribe(
      () => alert(`Opción ${option.id} actualizada`),
      (error) => console.error('Error al actualizar la opción:', error)
    );
  }

  deleteOption(optionId: number): void {
    this.surveyService.deleteOption(optionId).subscribe(
      () => this.options = this.options.filter(opt => opt.id !== optionId),
      (error) => console.error('Error al eliminar la opción:', error)
    );
  }

  goBackToSurveyList(): void {
    this.router.navigate(['/survey-list']);
  }

  navigateToSurveyDetails(surveyId: string): void {
    this.router.navigate(['/update-survey', surveyId]);
  }
}
