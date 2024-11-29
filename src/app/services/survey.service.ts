import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';  



@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrlEncuesta = 'http://localhost:9085/encuesta/crear';
  private apiUrl = 'http://localhost:9085/encuesta/todas'; 
  private apiUrlEncuestaId = 'http://localhost:9085/encuesta';
  private apiUrlSecciones = 'http://localhost:9085/secciones';
  private apiUrlPreguntas = 'http://localhost:9085/preguntas';
  private apiUrlOpciones = 'http://localhost:9085/opciones'; 
  private apiUrlRespuestas = 'http://localhost:9085/respuestas';  // Nueva URL para respuestas
 

  constructor(private http: HttpClient) {}

  
  createSurvey(survey: any): Observable<any> {
    return this.http.post(this.apiUrlEncuesta, survey);
  }

  
  saveSurvey(survey: any): Observable<any> {
    return this.http.post(this.apiUrlEncuesta, survey);
  }

  saveSection(surveyId: number, sectionData: any): Observable<any> {
    const payload = {
      titulo: sectionData.titulo,
      encuesta: { id: surveyId }, 
    };
  
    return this.http.post(this.apiUrlSecciones, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  createQuestion(surveyId: number, sectionId: number, questionData: any): Observable<any> {
    const url = `${this.apiUrlSecciones}/${sectionId}/encuesta/${surveyId}/pregunta`;
    return this.http.post(url, questionData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

    
    saveQuestion(questionData: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrlPreguntas}`, questionData);
    }

  
  deleteSection(sectionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlSecciones}/${sectionId}`);
  }

  
  deleteQuestion(questionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlPreguntas}/${questionId}`);
  }

  saveOption(option: any): Observable<any> {
    if (!option || !option.texto || !option.pregunta?.id) {
      throw new Error('Los datos de la opción no son válidos. Verifique el texto y el ID de la pregunta.');
    }
  
    return this.http.post(this.apiUrlOpciones, option, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  
  deleteOption(optionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlOpciones}/${optionId}`);
  }

getSurveys(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(  
    catchError((error) => {
      console.error('Error al obtener encuestas:', error);
      return throwError(() => new Error('Error al obtener encuestas'));
    })
  );
}

getActiveSurveys(): Observable<any[]> {
  const url = `${this.apiUrlEncuestaId}/estado/activa`;
  return this.http.get<any[]>(url).pipe(
    catchError((error) => {
      console.error('Error al obtener encuestas activas:', error);
      return throwError(() => new Error('Error al obtener encuestas activas'));
    })
  );
}

  getSections(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlSecciones);
  }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlPreguntas);
  }

 
  getOptions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlOpciones);
  }


  getSurveyDetails(id: string): Observable<any> {
    return forkJoin([
      this.http.get<any>(`${this.apiUrlEncuestaId}/${id}`),  
      this.http.get<any[]>(`${this.apiUrlSecciones}?encuestaId=${id}`),  
      this.http.get<any[]>(`${this.apiUrlPreguntas}?encuestaId=${id}`),  
      this.http.get<any[]>(`${this.apiUrlOpciones}?encuestaId=${id}`),  
    ]).pipe(
      tap(([survey, secciones, preguntas, opciones]) => {
        console.log("Encuesta: ", survey);
        console.log("Secciones: ", secciones);
        console.log("Preguntas: ", preguntas);
        console.log("Opciones: ", opciones);
      }),
      catchError((error) => {
        console.error('Error al cargar los detalles de la encuesta:', error);
        return throwError(() => new Error('Error al cargar los detalles de la encuesta'));
      })
    );
  }

  getQuestionsBySection(sectionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sections/${sectionId}/questions`);
  }
  
  saveResponses(encuestaId: string, respuestas: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrlRespuestas}`, { encuestaId, respuestas }).pipe(
      catchError((error) => {
        console.error('Error al guardar respuestas:', error);
        return throwError(() => new Error('Error al guardar respuestas'));
      })
    );
  }
  
  updateSurvey(survey: any): Observable<any> {
    return this.http.put(`${this.apiUrlEncuestaId}/actualizar/${survey.id}`, survey);
  }

  
  updateSection(section: any): Observable<any> {
    return this.http.put(`${this.apiUrlSecciones}/actualizar/${section.id}`, section);
  }

  
  updateQuestion(question: any): Observable<any> {
    return this.http.put(`${this.apiUrlPreguntas}/actualizar/${question.id}`, question);
  }

  
  updateOption(option: any): Observable<any> {
    return this.http.put(`${this.apiUrlOpciones}/actualizar/${option.id}`, option);
  }

  enviarRespuesta(respuesta: any): Observable<any> {
    return this.http.post(this.apiUrl, respuesta);
  }
  
  

}

