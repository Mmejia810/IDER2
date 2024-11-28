import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
  isSidebarActive: boolean = false;

  surveys: any[] = []; 
  filteredSurveys: any[] = []; 
  searchTerm: string = ''; 
  selectedFilter: string = 'all'; 
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
    this.loadSurveys(); 
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  loadSurveys() {
    this.isLoading = true;
    this.surveyService.getSurveys().subscribe(
      (data: any[]) => {
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
          this.loadSurveys();  
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

  
  filterSurveys() {
    let filtered = [...this.surveys];
    if (this.searchTerm.trim()) {
      filtered = filtered.filter((survey) =>
        survey.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        survey.id.includes(this.searchTerm)
      );
    }

    if (this.selectedFilter === 'date') {
      filtered.sort((a, b) => new Date(a.fecha_creacion).getTime() - new Date(b.fecha_creacion).getTime());
    } else if (this.selectedFilter === 'alphabetical') {
      filtered.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }

    this.filteredSurveys = filtered;
  }

  
  openSurvey(id: string) {
    this.router.navigate([`/survey-details/${id}`]);
  }

  logOut() {
    this.router.navigate(['/login']);
  }
  
}
