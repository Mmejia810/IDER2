import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-survey',
  templateUrl: './answer-survey.component.html',
  styleUrls: ['./answer-survey.component.css']
})
export class AnswerSurveyComponent implements OnInit {
  isSidebarActiveU = false;

  surveys: any[] = [];         // Datos originales
  activeSurveys: any[] = [];   // Datos filtrados para mostrar
  searchTerm = '';
  isLoading = true;

  filterOptions = [
    { label: 'Todas', value: 'all' },
    { label: 'Fecha', value: 'date' },
    { label: 'Alfabéticamente', value: 'alphabetical' },
  ];

  selectedSurvey: any = null;
  selectedSection: any = null;
  selectedQuestion: any = null;
  selectedOption: any = null;

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.loadActiveSurveys();
  }

  toggleSidebarU(): void {
    this.isSidebarActiveU = !this.isSidebarActiveU;
  }

  loadActiveSurveys(): void {
    this.isLoading = true;
    this.surveyService.getActiveSurveys().subscribe({
      next: (data) => {
        this.surveys = data;
        this.activeSurveys = data.filter(survey => survey.estado === 'abierta'); // Filtra sólo activas
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar encuestas activas:', error);
        this.isLoading = false;
      }
    });
  }

  filterActiveSurveys(): void {
    const term = this.searchTerm.toLowerCase();
    this.activeSurveys = this.surveys.filter(survey =>
      survey.estado === 'abierta' &&
      (survey.titulo.toLowerCase().includes(term) || survey.descripcion.toLowerCase().includes(term))
    );
  }

  editSurvey(survey: any): void {
    this.selectedSurvey = { ...survey };
    this.selectedSection = null;
    this.selectedQuestion = null;
    this.selectedOption = null;
  }

  editSection(section: any): void {
    this.selectedSection = { ...section };
  }

  editQuestion(question: any): void {
    this.selectedQuestion = { ...question };
  }

  editOption(option: any): void {
    this.selectedOption = { ...option };
  }

  saveSurvey(): void {
    if (!this.selectedSurvey) return;
    this.surveyService.updateSurvey(this.selectedSurvey).subscribe({
      next: () => {
        alert('Encuesta actualizada');
        this.loadActiveSurveys();
        this.selectedSurvey = null;
      },
      error: (error) => console.error('Error al actualizar encuesta:', error)
    });
  }

  saveSection(): void {
    if (!this.selectedSection) return;
    this.surveyService.updateSection(this.selectedSection).subscribe({
      next: () => {
        alert('Sección actualizada');
        this.selectedSection = null;
      },
      error: (error) => console.error('Error al actualizar sección:', error)
    });
  }

  saveQuestion(): void {
    if (!this.selectedQuestion) return;
    this.surveyService.updateQuestion(this.selectedQuestion).subscribe({
      next: () => {
        alert('Pregunta actualizada');
        this.selectedQuestion = null;
      },
      error: (error) => console.error('Error al actualizar pregunta:', error)
    });
  }

  saveOption(): void {
    if (!this.selectedOption) return;
    this.surveyService.updateOption(this.selectedOption).subscribe({
      next: () => {
        alert('Opción actualizada');
        this.selectedOption = null;
      },
      error: (error) => console.error('Error al actualizar opción:', error)
    });
  }

  openSurvey(id: string): void {
    this.router.navigate([`/user-sur-details/${id}`]);
  }

  logOut(): void {
    this.router.navigate(['/login']);
  }
}
