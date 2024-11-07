import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface SurveyData {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
}

export interface SectionData {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() surveyData: SurveyData = { id: '', startDate: '', endDate: '', title: '', description: '' }; // Inicializa con valores predeterminados
  @Input() sections: SectionData[] = [];
  @Input() questions: string[] = [];

  @Output() continue = new EventEmitter<void>();
  @Output() saveSection = new EventEmitter<SectionData>();
  @Output() nextSection = new EventEmitter<void>();
  @Output() addQuestion = new EventEmitter<void>();

  onContinue() {
    this.continue.emit();
  }

  onSaveSection(section: SectionData) {
    this.saveSection.emit(section);
  }

  onNextSection() {
    this.nextSection.emit();
  }

  onAddQuestion() {
    this.addQuestion.emit();
  }
}
