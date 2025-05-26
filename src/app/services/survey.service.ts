import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Question, Section } from '../models/surveyModels';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private readonly endpoints = {
    crearEncuesta: 'http://localhost:9085/encuesta/crear',
    todasEncuestas: 'http://localhost:9085/encuesta/todas',
    encuestaPorId: 'http://localhost:9085/encuesta',
    secciones: 'http://localhost:9085/secciones',
    preguntas: 'http://localhost:9085/preguntas',
    opciones: 'http://localhost:9085/opciones',
    respuestas: 'http://localhost:9085/respuestas',
  };

  constructor(private http: HttpClient) {}

  /** Encuestas */
  createSurvey(survey: any): Observable<any> {
    return this.http.post(this.endpoints.crearEncuesta, survey).pipe(
      catchError(error => {
        console.error('Error al crear encuesta:', error);
        return throwError(() => new Error('Error al crear encuesta'));
      })
    );
  }

  saveSurvey(survey: any): Observable<any> {
    return this.createSurvey(survey);
  }

  getSurveys(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoints.todasEncuestas).pipe(
      catchError(error => {
        console.error('Error al obtener encuestas:', error);
        return throwError(() => new Error('Error al obtener encuestas'));
      })
    );
  }

  getActiveSurveys(): Observable<any[]> {
    const url = `${this.endpoints.encuestaPorId}/estado/abierta`;
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Error al obtener encuestas activas:', error);
        return throwError(() => new Error('Error al obtener encuestas activas'));
      })
    );
  }

  getSurveyDetails(id: string): Observable<any> {
    return forkJoin([
      this.http.get<any>(`${this.endpoints.encuestaPorId}/${id}`),
      this.http.get<any[]>(`${this.endpoints.secciones}?encuestaId=${id}`),
      this.http.get<any[]>(`${this.endpoints.preguntas}?encuestaId=${id}`),
      this.http.get<any[]>(`${this.endpoints.opciones}?encuestaId=${id}`),
    ]).pipe(
      tap(([survey, secciones, preguntas, opciones]) => {
        console.log('Encuesta:', survey);
        console.log('Secciones:', secciones);
        console.log('Preguntas:', preguntas);
        console.log('Opciones:', opciones);
      }),
      catchError(error => {
        console.error('Error al cargar los detalles de la encuesta:', error);
        return throwError(() => new Error('Error al cargar los detalles de la encuesta'));
      })
    );
  }

  updateSurvey(survey: any): Observable<any> {
    return this.http.put(`${this.endpoints.encuestaPorId}/actualizar/${survey.id}`, survey).pipe(
      catchError(error => {
        console.error('Error al actualizar encuesta:', error);
        return throwError(() => new Error('Error al actualizar encuesta'));
      })
    );
  }

  /** Secciones */
  saveSection(surveyId: number, sectionData: { titulo: string }): Observable<any> {
    if (!sectionData.titulo || !surveyId) {
      return throwError(() => new Error('Datos inválidos para crear la sección.'));
    }

    const payload = {
      titulo: sectionData.titulo,
      encuesta: { id: surveyId },
    };
    return this.http.post(this.endpoints.secciones, payload).pipe(
      catchError(error => {
        console.error('Error al guardar sección:', error);
        return throwError(() => new Error('Error al guardar sección'));
      })
    );
  }

  getSectionsBySurveyId(surveyId: string): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.endpoints.secciones}?encuestaId=${surveyId}`).pipe(
      catchError(error => {
        console.error('Error al obtener las secciones:', error);
        return throwError(() => new Error('Error al obtener las secciones'));
      })
    );
  }

  updateSection(section: any): Observable<any> {
    return this.http.put(`${this.endpoints.secciones}/actualizar/${section.id}`, section).pipe(
      catchError(error => {
        console.error('Error al actualizar sección:', error);
        return throwError(() => new Error('Error al actualizar sección'));
      })
    );
  }

  deleteSection(sectionId: number): Observable<any> {
    return this.http.delete(`${this.endpoints.secciones}/${sectionId}`).pipe(
      catchError(error => {
        console.error('Error al eliminar sección:', error);
        return throwError(() => new Error('Error al eliminar sección'));
      })
    );
  }

  /** Preguntas */
  createQuestion(surveyId: number, sectionId: number, questionData: any): Observable<any> {
    if (!questionData || !questionData.texto) {
      return throwError(() => new Error('Datos inválidos para la pregunta.'));
    }

    const url = `${this.endpoints.secciones}/${sectionId}/encuesta/${surveyId}/pregunta`;
    return this.http.post(url, questionData).pipe(
      catchError(error => {
        console.error('Error al crear pregunta:', error);
        return throwError(() => new Error('Error al crear pregunta'));
      })
    );
  }

  getQuestionBySeccionId(seccionId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.endpoints.preguntas}?seccionId=${seccionId}`).pipe(
      catchError(error => {
        console.error('Error al obtener las preguntas:', error);
        return throwError(() => new Error('Error al obtener las preguntas'));
      })
    );
  }

  saveQuestion(questionData: any): Observable<any> {
    return this.http.post<any>(this.endpoints.preguntas, questionData).pipe(
      catchError(error => {
        console.error('Error al guardar pregunta:', error);
        return throwError(() => new Error('Error al guardar pregunta'));
      })
    );
  }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoints.preguntas).pipe(
      catchError(error => {
        console.error('Error al obtener preguntas:', error);
        return throwError(() => new Error('Error al obtener preguntas'));
      })
    );
  }

  getQuestionsBySection(sectionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpoints.secciones}/${sectionId}/preguntas`).pipe(
      catchError(error => {
        console.error('Error al obtener preguntas por sección:', error);
        return throwError(() => new Error('Error al obtener preguntas por sección'));
      })
    );
  }

  updateQuestion(question: any): Observable<any> {
    return this.http.put(`${this.endpoints.preguntas}/actualizar/${question.id}`, question).pipe(
      catchError(error => {
        console.error('Error al actualizar pregunta:', error);
        return throwError(() => new Error('Error al actualizar pregunta'));
      })
    );
  }

  deleteQuestion(questionId: number): Observable<any> {
    return this.http.delete(`${this.endpoints.preguntas}/${questionId}`).pipe(
      catchError(error => {
        console.error('Error al eliminar pregunta:', error);
        return throwError(() => new Error('Error al eliminar pregunta'));
      })
    );
  }

  /** Opciones */
  saveOption(option: any): Observable<any> {
    if (!option || !option.texto || !option.pregunta?.id) {
      return throwError(() => new Error('Los datos de la opción no son válidos. Verifique el texto y el ID de la pregunta.'));
    }
    return this.http.post(this.endpoints.opciones, option).pipe(
      catchError(error => {
        console.error('Error al guardar opción:', error);
        return throwError(() => new Error('Error al guardar opción'));
      })
    );
  }

  getOptions(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoints.opciones).pipe(
      catchError(error => {
        console.error('Error al obtener opciones:', error);
        return throwError(() => new Error('Error al obtener opciones'));
      })
    );
  }

  updateOption(option: any): Observable<any> {
    return this.http.put(`${this.endpoints.opciones}/actualizar/${option.id}`, option).pipe(
      catchError(error => {
        console.error('Error al actualizar opción:', error);
        return throwError(() => new Error('Error al actualizar opción'));
      })
    );
  }

  deleteOption(optionId: number): Observable<any> {
    return this.http.delete(`${this.endpoints.opciones}/${optionId}`).pipe(
      catchError(error => {
        console.error('Error al eliminar opción:', error);
        return throwError(() => new Error('Error al eliminar opción'));
      })
    );
  }

  /** Respuestas */
  saveOpenQuestionResponse(respuesta: string, usuarioId: number, seccionId: number, preguntaId: number): Observable<any> {
    if (!respuesta || !usuarioId || !seccionId || !preguntaId) {
      return throwError(() => new Error('Datos inválidos para guardar la respuesta.'));
    }

    const payload = {
      respuesta,
      usuario: { id: usuarioId },
      seccionEncuesta: { id: seccionId },
      pregunta: { id: preguntaId },
      opciones: [],
    };

    return this.http.post<any>(this.endpoints.respuestas, payload).pipe(
      catchError(error => {
        console.error('Error al guardar respuesta de pregunta abierta:', error);
        return throwError(() => new Error('Error al guardar respuesta de pregunta abierta'));
      })
    );
  }

  saveMultipleChoiceQuestionResponse(respuesta: string, usuarioId: number, seccionId: number, preguntaId: number, opciones: { id: number }[]): Observable<any> {
    if (!respuesta || !usuarioId || !seccionId || !preguntaId || !opciones?.length) {
      return throwError(() => new Error('Datos inválidos para guardar respuesta.'));
    }

    const payload = {
      respuesta,
      usuario: { id: usuarioId },
      seccionEncuesta: { id: seccionId },
      pregunta: { id: preguntaId },
      opciones,
    };

    return this.http.post<any>(this.endpoints.respuestas, payload).pipe(
      catchError(error => {
        console.error('Error al guardar respuesta de opción múltiple:', error);
        return throwError(() => new Error('Error al guardar respuesta de opción múltiple'));
      })
    );
  }

  saveResponse(respuesta: any): Observable<any> {
  return this.http.post(this.endpoints.respuestas, respuesta).pipe(
    catchError(error => {
      console.error('Error al guardar respuesta:', error);
      return throwError(() => new Error('Error al guardar respuesta'));
    })
  );
}

getRespuestas(): Observable<any[]> {
  return this.http.get<any[]>(this.endpoints.respuestas).pipe(
    catchError(error => {
      console.error('Error al obtener respuestas:', error);
      return throwError(() => new Error('Error al obtener respuestas'));
    })
  );
}

  eliminarEncuesta(id: number): Observable<void> {
  return this.http.delete<void>(`${this.endpoints.encuestaPorId}/eliminar/${id}`);
}

}

