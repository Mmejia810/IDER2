import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isSidebarActive: boolean = false;
  greetingMessage: string = ''; // Mensaje de saludo

  constructor(private router: Router) {}

  ngOnInit() {
    this.setGreetingMessage(); // Establece el mensaje de saludo
  }

  // Método para establecer el mensaje de saludo basado en la hora del día
  setGreetingMessage() {
    const hour = new Date().getHours();
    let timeOfDay = 'día'; // Establecer valor predeterminado

    // Condición para la tarde
    if (hour >= 12 && hour < 18) {
      timeOfDay = 'tarde';
    }
    // Condición para la noche
    else if (hour >= 18 || hour < 6) {
      timeOfDay = 'noche';
    }

    // Cambiar el mensaje según la hora
    if (timeOfDay === 'día') {
      this.greetingMessage = `Bienvenido a la creación de encuestas. ¡Ten un excelente día!`;
    } else {
      this.greetingMessage = `Bienvenido a la creación de encuestas. ¡Ten una excelente ${timeOfDay}!`;
    }
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
    this.toggleSidebar();
  }

  logOut() {
    this.router.navigate(['/login']);
  }

  createSurvey() {
    this.router.navigate(['/survey']); // Redirige al formulario de creación de encuestas
  }

  redirectToListSurveys() {
    this.router.navigate(['/survey-list']); // Solo redirige sin obtener encuestas
  }

  viewProfile() {
    // Redirige al perfil del usuario
    this.router.navigate(['/show-credentials']);
  }

  updateUserProfiles() {
    // Redirige para gestionar otros perfiles
    this.router.navigate(['/admin/user-profiles']);
  }

  updateSurvey() {
    console.log('Actualizar Encuesta');
  
    this.router.navigate(['/update-survey']); // Cambiar por la ruta correspondiente
  }

  deleteSurvey() {
    console.log('Eliminar Encuesta');
    // Lógica para navegación o confirmación de eliminación
    this.router.navigate(['/delete-survey']); // Cambiar por la ruta correspondiente
  }
  
  
}
