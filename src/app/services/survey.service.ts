import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrlEncuesta = 'http://localhost:9085/encuesta/crear';
  private apiUrlSecciones = 'http://localhost:9085/secciones';
  private apiUrlPreguntas = 'http://localhost:9085/preguntas';
  private apiUrlOpciones = 'http://localhost:9085/opciones';

  constructor(private http: HttpClient) {}

  createSurvey(survey: any): Observable<any> {
    return this.http.post(this.apiUrlEncuesta, survey);
  }

  saveSection(sectionData: any): Observable<any> {
    return this.http.post(this.apiUrlSecciones, sectionData);
  }

  createQuestion(surveyId: number, sectionId: number, questionData: any): Observable<any> {
  const url = `${this.apiUrlSecciones}/${sectionId}/encuesta/${surveyId}/pregunta`;
  return this.http.post(url, questionData, {
    headers: { 'Content-Type': 'application/json' }
  });
}


  createOption(questionId: number, optionData: any): Observable<any> {
    const url = `${this.apiUrlPreguntas}/${questionId}/opcion`;
    return this.http.post(url, optionData);
  }

  getSurveys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlSecciones);
  }
}
