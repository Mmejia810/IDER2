import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9085/usuario'; 

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, pass: string }): Observable<{ message: string, userId: number }> {
    return this.http.post<{ message: string, userId: number }>(`${this.baseUrl}/login`, credentials);
  }
  

  register(userData: { 
    identificacion: string; 
    nombre: string; 
    apellido: string; 
    estado: string; 
    email: string; 
    pass: string; 
  }): Observable<any> {
      return this.http.post(`${this.baseUrl}/registrar`, userData);
  }
  

  recoverPassword(email: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/recover-password`, email);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUserProfile(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('No user ID found. Please login first.');
    }
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  
  updateUserProfile(userProfile: any): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('No user ID found. Please login first.');
    }
    return this.http.put(`${this.baseUrl}/${userId}`, userProfile);
  }
  
}
