// src/app/services/survey.service.ts
import { Injectable } from '@angular/core';
import { Survey } from '../models/surveyModels';  // Asegúrate de importar el modelo correctamente
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrl = 'http://localhost:9085/encuesta/todas'; // Cambia esta URL por la de tu API

  constructor(private http: HttpClient) {}

  // Obtener encuestas desde la API
  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.apiUrl);
  }

  sortSurveysAlphabetically(surveys: Survey[]): Survey[] {
    return [...surveys].sort((a, b) => a.name.localeCompare(b.name));
  }

  sortSurveysByDate(surveys: Survey[]): Survey[] {
    return [...surveys].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    });
  }
}
