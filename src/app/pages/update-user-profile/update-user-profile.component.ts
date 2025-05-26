import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; // Importa tu servicio real
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit {
  users: any[] = []; // Lista de usuarios (ya filtrados por backend)
  selectedUser: any = null; // Usuario seleccionado para edición

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers(); // Carga los usuarios al iniciar el componente
  }

  // Obtener usuarios del backend (ya solo los con id 2)
  getUsers(): void {
    this.authService.getUserProfile().subscribe(
      (users: any[]) => {
        this.users = users;  // No necesitas filtrar porque backend ya envía solo id 2
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  // Seleccionar un usuario para editar
  editUser(user: any): void {
    this.selectedUser = { ...user }; // Clonamos para evitar mutar la lista original
  }

  // Cancelar edición
  cancelEdit(): void {
    this.selectedUser = null;
  }

  // Actualizar usuario
  updateUser(): void {
    if (this.selectedUser) {
      this.authService.updateUserProfile(this.selectedUser).subscribe(
        (response) => {
          console.log('Usuario actualizado:', response);
          this.selectedUser = null;
          this.getUsers(); // Recarga usuarios para refrescar lista
        },
        (error) => {
          console.error('Error al actualizar el perfil:', error);
        }
      );
    }
  }
}
