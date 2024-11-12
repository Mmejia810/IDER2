import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isActive: boolean = false;  // Recibe la variable de visibilidad desde el componente padre

  constructor(private router: Router) {}

  // Método para navegar a una ruta
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
