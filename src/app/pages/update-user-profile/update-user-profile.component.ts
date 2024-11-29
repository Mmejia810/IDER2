import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; // Asegúrate de importar tu servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit {
  users: any[] = []; // Para almacenar la lista de usuarios
  selectedUser: any = null; // Para almacenar el usuario seleccionado

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers(); // Traer los usuarios al cargar el componente
  }

  // Método para obtener todos los usuarios
  getUsers(): void {
    this.authService.getUserProfile().subscribe(
      (users: any) => {
        this.users = users; // Guardamos los usuarios traídos desde la API
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  // Método para seleccionar un usuario a editar
  editUser(user: any): void {
    this.selectedUser = { ...user }; // Creamos una copia del usuario para editarlo
  }

  // Método para cancelar la edición
  cancelEdit(): void {
    this.selectedUser = null; // Limpiamos el usuario seleccionado
  }

  // Método para actualizar los datos del usuario
  updateUser(): void {
    if (this.selectedUser) {
      this.authService.updateUserProfile(this.selectedUser).subscribe(
        (response) => {
          console.log('Usuario actualizado:', response);
          this.selectedUser = null; // Limpiamos después de la actualización
          this.getUsers(); // Refrescamos la lista de usuarios
        },
        (error) => {
          console.error('Error al actualizar el perfil:', error);
        }
      );
    }
  }
}
