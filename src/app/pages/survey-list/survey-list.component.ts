import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
  isSidebarActive: boolean = false; // Estado del sidebar (colapsable)
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

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.loadSurveys(); // Cargar encuestas al inicializar
  }

  // Método para cargar encuestas desde el servicio
  loadSurveys() {
    this.isLoading = true; // Mostrar indicador de carga
    this.surveyService.getSurveys().subscribe(
      (data: any[]) => {
        this.surveys = data.map((survey) => ({
          ...survey,
          startDate: survey.fecha_creacion || new Date().toISOString(),
          closeDate: survey.fecha_cierre || new Date().toISOString(),
        }));
        this.filteredSurveys = [...this.surveys]; // Inicializar lista filtrada
        this.isLoading = false; // Ocultar indicador de carga
      },
      (error) => {
        console.error('Error al cargar encuestas:', error);
        this.isLoading = false;
      }
    );
  }

  // Método para activar/desactivar el sidebar
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  // Método para buscar y filtrar encuestas dinámicamente
  filterSurveys() {
    let filtered = [...this.surveys];

    // Filtrar por término de búsqueda
    if (this.searchTerm.trim()) {
      filtered = filtered.filter((survey) =>
        survey.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        survey.id.includes(this.searchTerm)
      );
    }

    // Ordenar según el filtro seleccionado
    if (this.selectedFilter === 'date') {
      filtered.sort((a, b) => new Date(a.fecha_creacion).getTime() - new Date(b.fecha_creacion).getTime());
    } else if (this.selectedFilter === 'alphabetical') {
      filtered.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }

    this.filteredSurveys = filtered;
  }

  // Método para redirigir a los detalles de la encuesta
  openSurvey(id: string) {
    this.router.navigate([`/surveys/${id}`]);
  }

  // Método para cerrar sesión
  logOut() {
    this.router.navigate(['/home']);
  }
}
