import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrlEncuesta = 'http://localhost:9085/encuesta/crear';
  private apiUrlSecciones = 'http://localhost:9085/secciones';
  private apiUrlPreguntas = 'http://localhost:9085/preguntas';
  private apiUrlOpciones = 'http://localhost:9085/opciones';  // Cambié esta URL

  constructor(private http: HttpClient) {}

  // Crear encuesta
  createSurvey(survey: any): Observable<any> {
    return this.http.post(this.apiUrlEncuesta, survey);
  }

  // Guardar encuesta (alias de `createSurvey`)
  saveSurvey(survey: any): Observable<any> {
    return this.http.post(this.apiUrlEncuesta, survey);
  }

  // Guardar sección
  saveSection(sectionData: any): Observable<any> {
    return this.http.post(this.apiUrlSecciones, sectionData);
  }

  // Crear pregunta en una sección específica de una encuesta
  createQuestion(surveyId: number, sectionId: number, questionData: any): Observable<any> {
    const url = `${this.apiUrlSecciones}/${sectionId}/encuesta/${surveyId}/pregunta`;
    return this.http.post(url, questionData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Guardar pregunta
  saveQuestion(questionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlPreguntas}`, questionData);
  }

  // Eliminar sección
  deleteSection(sectionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlSecciones}/${sectionId}`);
  }

  // Eliminar pregunta
  deleteQuestion(questionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlPreguntas}/${questionId}`);
  }

  saveOption(option: any): Observable<any> {
    // Validación opcional para asegurar que los datos estén en el formato esperado
    if (!option || !option.texto || !option.pregunta?.id) {
      throw new Error('Los datos de la opción no son válidos. Verifique el texto y el ID de la pregunta.');
    }
  
    // Realiza la solicitud POST al endpoint de opciones
    return this.http.post(this.apiUrlOpciones, option, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  
  

  // Eliminar opción
  deleteOption(optionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlOpciones}/${optionId}`);
  }

  // Obtener encuestas
  getSurveys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlEncuesta);
  }

  // Obtener secciones
  getSections(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlSecciones);
  }

  // Obtener preguntas
  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlPreguntas);
  }

  // Obtener opciones
  getOptions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlOpciones);
  }
}
