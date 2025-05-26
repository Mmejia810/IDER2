import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Simulación: aquí decides cómo validar si hay un usuario autenticado
  isLoggedIn(): boolean {
    // Ejemplo sencillo, puedes validar token o sesión en localStorage, cookies, etc.
    return !!localStorage.getItem('token'); // devuelve true si existe token
  }

  // Puedes agregar otros métodos para login, logout, etc.
}
