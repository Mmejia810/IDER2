import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl:'./home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent implements OnInit {

  isSidebarActiveU: boolean = false;
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
      this.greetingMessage = `Bienvenido a IDER. ¡Ten un excelente día!`;
    } else {
      this.greetingMessage = `Bienvenido a IDER. ¡Ten una excelente ${timeOfDay}!`;
    }
  }

  toggleSidebar() {
    this.isSidebarActiveU = !this.isSidebarActiveU;
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
    this.toggleSidebar();
  }

  logOut() {
    this.router.navigate(['/loginuser']);
  }

   ViewActiveSurvey() {
     this.router.navigate(['/answer']); 
   }

  // redirectToListSurveys() {
  //   this.router.navigate(['/survey-list']); // Solo redirige sin obtener encuestas
  // }

   viewProfile() {
     // Redirige al perfil del usuario
    this.router.navigate(['/profile']);
   }

   updateProfile() {
     // Redirige para actualizar el perfil
     this.router.navigate(['/profile/update']);
   }

  // updateUserProfiles() {
  //   // Redirige para gestionar otros perfiles
  //   this.router.navigate(['/admin/user-profiles']);
  // }
}
