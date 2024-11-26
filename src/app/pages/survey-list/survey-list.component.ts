import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
  surveys: any[] = []; // Lista completa de encuestas
  filteredSurveys: any[] = []; // Lista filtrada de encuestas
  searchTerm: string = ''; // Término de búsqueda
  selectedFilter: string = 'all'; // Filtro seleccionado
  isLoading: boolean = true; // Indicador de carga
  filterOptions = [
    { label: 'Todas', value: 'all' },
    { label: 'Fecha', value: 'date' },
    { label: 'Alfabéticamente', value: 'alphabetical' },
  ];

  // Datos para edición
  selectedSurvey: any = null;
  selectedSection: any = null;
  selectedQuestion: any = null;
  selectedOption: any = null;

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

  // Método para editar una encuesta
  editSurvey(survey: any) {
    this.selectedSurvey = { ...survey };  // Clonar la encuesta para edición
    this.selectedSection = null;
    this.selectedQuestion = null;
    this.selectedOption = null;
  }

  // Método para editar una sección
  editSection(section: any) {
    this.selectedSection = { ...section };  // Clonar la sección para edición
  }

  // Método para editar una pregunta
  editQuestion(question: any) {
    this.selectedQuestion = { ...question };  // Clonar la pregunta para edición
  }

  // Método para editar una opción
  editOption(option: any) {
    this.selectedOption = { ...option };  // Clonar la opción para edición
  }

  // Guardar cambios de encuesta
  saveSurvey() {
    if (this.selectedSurvey) {
      this.surveyService.updateSurvey(this.selectedSurvey).subscribe(
        () => {
          alert('Encuesta actualizada');
          this.loadSurveys();  // Recargar las encuestas
          this.selectedSurvey = null;
        },
        (error) => console.error('Error al actualizar encuesta:', error)
      );
    }
  }

  // Guardar cambios de sección
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

  // Guardar cambios de pregunta
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

  // Guardar cambios de opción
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

  // Método para buscar y filtrar encuestas
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

  // Método para redirigir a los detalles de la encuesta
  openSurvey(id: string) {
    this.router.navigate([`/survey-details/${id}`]);
  }

  logOut() {
    this.router.navigate(['/login']);
  }
  
}
