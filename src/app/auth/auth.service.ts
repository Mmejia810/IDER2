import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9085/usuario'; // Cambia esto a tu URL de backend

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, pass: string }): Observable<any> {
    // Asegúrate de que la respuesta sea de tipo texto
    return this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' });
  }

  register(userData: { email: string, pass: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  recoverPassword(email: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/recover-password`, email);
  }
}
