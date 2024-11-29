import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit {
  users: any[] = [];  // Array para almacenar los usuarios
  selectedUser: any = null;  // Usuario seleccionado para actualizar

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();  // Cargar los usuarios al iniciar
  }

  // Método para cargar los usuarios con rol '2' (usuarios normales)
  loadUsers(): void {
    this.http.get<any[]>('https://api.tuservidor.com/users')  // Ajusta la URL de tu API
      .subscribe(users => {
        this.users = users.filter(user => user.roleId === 2);  // Filtramos solo los usuarios normales
      });
  }

  // Método para seleccionar un usuario y permitir la edición
  editUser(user: any): void {
    this.selectedUser = { ...user };  // Hacemos una copia para editar
  }

  // Método para actualizar los datos del usuario
  updateUser(): void {
    if (this.selectedUser) {
      this.http.put(`https://api.tuservidor.com/users/${this.selectedUser.id}`, this.selectedUser)  // Ajusta la URL de tu API
        .subscribe(response => {
          console.log('Usuario actualizado:', response);
          this.loadUsers();  // Recargar los usuarios después de actualizar
          this.selectedUser = null;  // Limpiar la selección
        });
    }
  }

  // Método para cancelar la edición
  cancelEdit(): void {
    this.selectedUser = null;
  }
}
