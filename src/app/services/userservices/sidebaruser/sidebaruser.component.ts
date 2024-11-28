import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebaruser',
  templateUrl: './sidebaruser.component.html',
  styleUrl: './sidebaruser.component.css'
})
export class SidebaruserComponent {
  @Input() isActiveU: boolean = false;  // Recibe la variable de visibilidad desde el componente padre

  constructor(private router: Router) {}

  // Método para navegar a una ruta
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
