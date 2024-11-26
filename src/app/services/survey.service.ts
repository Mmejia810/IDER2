import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';  // Asegúrate de importar tap



@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrlEncuesta = 'http://localhost:9085/encuesta/crear';
  private apiUrl = 'http://localhost:9085/encuesta/todas'; // URL para obtener las encuestas
  private apiUrlEncuestaId = 'http://localhost:9085/encuesta';
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

  saveSection(surveyId: number, sectionData: any): Observable<any> {
    const payload = {
      titulo: sectionData.titulo, // Título de la sección
      encuesta: { id: surveyId }, // ID de la encuesta asociada
    };
  
    return this.http.post(this.apiUrlSecciones, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
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

// Obtener encuestas desde el backend
getSurveys(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(  // Cambié la URL aquí
    catchError((error) => {
      console.error('Error al obtener encuestas:', error);
      return throwError(() => new Error('Error al obtener encuestas'));
    })
  );
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


  getSurveyDetails(id: string): Observable<any> {
    return forkJoin([
      this.http.get<any>(`${this.apiUrlEncuestaId}/${id}`),  // Encuesta por ID
      this.http.get<any[]>(`${this.apiUrlSecciones}?encuestaId=${id}`),  // Secciones asociadas a la encuesta
      this.http.get<any[]>(`${this.apiUrlPreguntas}?encuestaId=${id}`),  // Preguntas asociadas a la encuesta
      this.http.get<any[]>(`${this.apiUrlOpciones}?encuestaId=${id}`),  // Opciones asociadas a la encuesta
    ]).pipe(
      tap(([survey, secciones, preguntas, opciones]) => {
        console.log("Encuesta: ", survey);
        console.log("Secciones: ", secciones);  // Deberías ver solo las secciones asociadas a esta encuesta
        console.log("Preguntas: ", preguntas);
        console.log("Opciones: ", opciones);
      }),
      catchError((error) => {
        console.error('Error al cargar los detalles de la encuesta:', error);
        return throwError(() => new Error('Error al cargar los detalles de la encuesta'));
      })
    );
  }
  
  
  // Actualizar encuesta
  updateSurvey(survey: any): Observable<any> {
    return this.http.put(`${this.apiUrlEncuestaId}/actualizar/${survey.id}`, survey);
  }

  // Actualizar sección
  updateSection(section: any): Observable<any> {
    return this.http.put(`${this.apiUrlSecciones}/actualizar/${section.id}`, section);
  }

  // Actualizar pregunta
  updateQuestion(question: any): Observable<any> {
    return this.http.put(`${this.apiUrlPreguntas}/actualizar/${question.id}`, question);
  }

  // Actualizar opción
  updateOption(option: any): Observable<any> {
    return this.http.put(`${this.apiUrlOpciones}/actualizar/${option.id}`, option);
  }
  

}

