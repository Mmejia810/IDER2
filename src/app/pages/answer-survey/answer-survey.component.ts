import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-survey',
  templateUrl: './answer-survey.component.html',
  styleUrl: './answer-survey.component.css'
})
export class AnswerSurveyComponent implements OnInit{
  isSidebarActiveU: boolean = false;

  surveys: any[] = []; 
  activeSurveys: any[] = []; 
  searchTerm: string = ''; 
  isLoading: boolean = true; 
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

  toggleSidebarU() {
    this.isSidebarActiveU = !this.isSidebarActiveU;
  }

 // Método para cargar encuestas
 

loadActiveSurveys(): void {
  this.surveyService.getActiveSurveys().subscribe({
    next: (data) => {
      this.activeSurveys = data;
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error al cargar encuestas activas:', error);
      this.isLoading = false;
    }
  });
}

// Método para filtrar solo las encuestas activas
filterActiveSurveys(): void {
  const term = this.searchTerm.toLowerCase();
  this.activeSurveys = this.surveys.filter(survey =>
    survey.estado === 'activa' && 
    (survey.titulo.toLowerCase().includes(term) || survey.descripcion.toLowerCase().includes(term))
  );
}

// Método para manejar cambios en el término de búsqueda
onSearchChange(): void {
  this.filterActiveSurveys();
}

  
  editSurvey(survey: any) {
    this.selectedSurvey = { ...survey };  
    this.selectedSection = null;
    this.selectedQuestion = null;
    this.selectedOption = null;
  }

  
  editSection(section: any) {
    this.selectedSection = { ...section };  
  }

  
  editQuestion(question: any) {
    this.selectedQuestion = { ...question };  
  }

  
  editOption(option: any) {
    this.selectedOption = { ...option };  
  }

  
  saveSurvey() {
    if (this.selectedSurvey) {
      this.surveyService.updateSurvey(this.selectedSurvey).subscribe(
        () => {
          alert('Encuesta actualizada');
          this.loadActiveSurveys();  
          this.selectedSurvey = null;
        },
        (error) => console.error('Error al actualizar encuesta:', error)
      );
    }
  }

  
  saveSection() {
    if (this.selectedSection) {
      this.surveyService.updateSection(this.selectedSection).subscribe(
        () => {
          alert('Sección actualizada');
          this.selectedSection = null;
        },
        (error) => console.error('Error al actualizar sección:', error)
      );
    }
  }

  
  saveQuestion() {
    if (this.selectedQuestion) {
      this.surveyService.updateQuestion(this.selectedQuestion).subscribe(
        () => {
          alert('Pregunta actualizada');
          this.selectedQuestion = null;
        },
        (error) => console.error('Error al actualizar pregunta:', error)
      );
    }
  }

  
  saveOption() {
    if (this.selectedOption) {
      this.surveyService.updateOption(this.selectedOption).subscribe(
        () => {
          alert('Opción actualizada');
          this.selectedOption = null;
        },
        (error) => console.error('Error al actualizar opción:', error)
      );
    }
  }
  
  openSurvey(id: string) {
    this.router.navigate([`/user-sur-details/${id}`]);
  }

  logOut() {
    this.router.navigate(['/login']);
  }
  
}
