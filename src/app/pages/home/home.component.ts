import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
  // Inyecta el servicio de toast

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isSidebarActive: boolean = false;
  greetingMessage: string = '';

  constructor(
    private router: Router,
    private ToastService: ToastService  // Inyecta el servicio
  ) {}

  ngOnInit() {
    this.setGreetingMessage();
  }

  // Función para establecer el mensaje de saludo dependiendo de la hora del día
  setGreetingMessage() {
    const hour = new Date().getHours();
    let timeOfDay = 'día';

    if (hour >= 12 && hour < 18) {
      timeOfDay = 'tarde';
    } else if (hour >= 18 || hour < 6) {
      timeOfDay = 'noche';
    }

    if (timeOfDay === 'día') {
      this.greetingMessage = `Bienvenido a la creación de encuestas. ¡Ten un excelente día!`;
    } else {
      this.greetingMessage = `Bienvenido a la creación de encuestas. ¡Ten una excelente ${timeOfDay}!`;
    }
  }

  // Función para alternar el estado de la barra lateral
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  // Función para navegar a una ruta
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
    this.toggleSidebar();
  }

  // Función de cierre de sesión con confirmación mediante Toast
  logOut() {
    // Mostrar un mensaje toast preguntando si el usuario está seguro de cerrar sesión
    this.ToastService.show('¿Estás seguro de que quieres cerrar sesión?', 'Sí', 5000);

    // Redirigir después de que el usuario confirme (simulado con setTimeout)
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);  // Esperar 5 segundos antes de redirigir
  }

  // Funciones para navegar a diferentes páginas
  createSurvey() {
    this.router.navigate(['/survey']);
  }

  redirectToListSurveys() {
    this.router.navigate(['/survey-list']);
  }

  viewProfile() {
    this.router.navigate(['/show-credentials']);
  }

  updateUserProfiles() {
    this.router.navigate(['/update-user-profile']);
  }

  updateSurvey() {
    this.router.navigate(['/update-survey']);
  }

  deleteSurvey() {
    this.router.navigate(['/delete-survey']);
  }

  encuestaTabla(){
    this.router.navigate(['/encuestas-tabla'])
  }
}
