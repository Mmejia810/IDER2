import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/surveyModels';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrl = 'http://localhost:9085/encuesta'; // Reemplaza esto por tu URL real

  constructor(private http: HttpClient) {}

   // Método para obtener las encuestas
   getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${this.apiUrl}/surveys`);
  }

  // Otros métodos que puedas tener para crear, eliminar, o actualizar encuestas
  createSurvey(surveyData: Survey): Observable<Survey> {
    return this.http.post<Survey>(`${this.apiUrl}/surveys`, surveyData);
  }

  createQuestion(surveyId: number, sectionId: number, questionData: any): Observable<any> {
    // Aquí haces una solicitud POST para enviar la nueva pregunta al backend
    const url = `${this.apiUrl}/survey/${surveyId}/section/${sectionId}/question`;
    return this.http.post(url, questionData);
  }

  createOption(questionId: number, optionData: any): Observable<any> {
    const url = `${this.apiUrl}/question/${questionId}/option`;
    return this.http.post(url, optionData);
  }

  // Aquí podrías agregar otros métodos para eliminar o editar opciones si es necesario.
}
