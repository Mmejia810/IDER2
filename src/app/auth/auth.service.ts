import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://api.example.com'; // Cambia esto a tu URL de backend

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(userData: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  recoverPassword(email: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/recover-password`, email);
  }
}
