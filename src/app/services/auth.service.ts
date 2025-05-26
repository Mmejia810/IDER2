import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // devuelve true si hay token
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  // Aquí podrías tener tu método login() que devuelva un Observable simulado o real
  login(credentials: { email: string; pass: string }) {
    // Aquí iría la llamada HTTP real
    // return this.http.post('tu-backend/login', credentials);
    // Por ahora esto es solo un placeholder
    return {
      subscribe: (next: any, error: any) => {
        // simula una respuesta exitosa
        next({
          message: 'Login successful',
          userId: 1,
          role: 'Administrador'
        });
      }
    };
  }
}
