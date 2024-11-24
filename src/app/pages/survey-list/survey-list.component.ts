import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
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

  // Nuevas propiedades para almacenar los detalles de la encuesta
  selectedSurvey: any = null;
  sections: any[] = [];
  questions: any[] = [];
  options: any[] = [];

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.loadSurveys(); // Cargar encuestas al inicializar
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

  // Método para buscar y filtrar encuestas dinámicamente
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
    this.isLoading = true;
    this.surveyService.getSurveyDetails(id).subscribe(
      (data: any) => {
        this.selectedSurvey = data.survey;
        this.sections = data.sections;
        this.questions = data.questions;
        this.options = data.options;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los detalles de la encuesta:', error);
        this.isLoading = false;
      }
    );
  }

  logOut() {
    this.router.navigate(['/home']);
  }
}
