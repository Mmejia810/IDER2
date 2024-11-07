import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Survey {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  questions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private apiUrl = 'https://api.tuapp.com/surveys';

  constructor(private http: HttpClient) {}

  getSurveyById(id: string): Observable<Survey> {
    return this.http.get<Survey>(`${this.apiUrl}/${id}`);
  }

  createSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(this.apiUrl, survey);
  }

  updateSurvey(id: string, survey: Survey): Observable<Survey> {
    return this.http.put<Survey>(`${this.apiUrl}/${id}`, survey);
  }

  deleteSurvey(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
