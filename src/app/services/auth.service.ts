import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  // otros campos si los tienes
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/usuario'; // Cambia esta URL por la de tu backend

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  login(credentials: { email: string; pass: string }): Observable<any> {
    // Aquí va la llamada HTTP real
    return this.http.post<any>('http://localhost:8080/api/login', credentials);
  }

  // Obtener lista de usuarios (filtrados por backend)
  getUserProfile(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl + '/id2');
    // suponiendo que la ruta para usuarios con id 2 sea /api/users/id2
  }

  // Actualizar usuario
  updateUserProfile(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${user.id}`, user);
  }
}
