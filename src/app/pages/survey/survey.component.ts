import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';

interface Option {
  text: string;
}

interface Question {
  text: string;
  type: 'abierta' | 'multiple';
  options: Option[];
}

interface Section {
  id: number;
  title: string;
  questions: Question[];
  showQuestionTypeSelector: boolean;
  expandedSectionIndex: number | null;
  expandedQuestionIndex: number | null;
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  isSidebarActive: boolean = false;
  surveyId = 1;
  surveyTitle = '';
  surveyDescription = '';
  startDate: string = '';
  endDate: Date | null = null;
  sections: Section[] = [];
  sectionIdCounter: number = 1;

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit() {
    const today = new Date();
    this.startDate = today.toISOString().slice(0, 10);
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  closeSidebar() {
    this.isSidebarActive = false;
  }

  // Agregado: Método para validar la encuesta
  isSurveyValid(): boolean {
    return this.surveyTitle.trim() !== '' && this.surveyDescription.trim() !== '' && this.endDate !== null;
  }

  saveSurvey() {
    if (!this.isSurveyValid()) {
      alert('Debe rellenar todos los campos de la encuesta antes de guardarla.');
      return;
    }
    
    const formattedEndDate = this.endDate ? this.endDate.toLocaleDateString('en-GB') : '';
  
    const newSurvey = {
      id: this.surveyId,
      name: this.surveyTitle,
      title: this.surveyTitle,
      description: this.surveyDescription,
      startDate: this.startDate,
      endDate: formattedEndDate,
      createdAt: new Date().toISOString(),
      sections: this.sections
    };
  
    this.surveyService.createSurvey(newSurvey).subscribe(response => {
      alert('Encuesta creada con éxito');
      this.incrementSurveyId();
      this.resetForm();
    });
  }

  incrementSurveyId() {
    this.surveyId += 1;
  }

  resetForm() {
    this.surveyTitle = '';
    this.surveyDescription = '';
    this.endDate = null;
    this.sections = [];
  }

  addSection() {
    const newSection: Section = {
      id: this.sectionIdCounter++,  
      title: `Sección ${this.sectionIdCounter}`,
      questions: [],
      showQuestionTypeSelector: false,
      expandedSectionIndex: null,
      expandedQuestionIndex: null
    };
    this.sections.push(newSection);
  }

  saveSection(section: Section) {
    if (this.isSectionValid(section)) {
      alert(`Sección ${section.title} guardada con éxito`);
    } else {
      alert('Debe rellenar el título de la sección antes de guardarla.');
    }
  }

  deleteSection(sectionId: number) {
    this.sections = this.sections.filter(section => section.id !== sectionId);
    alert(`Sección ${sectionId} eliminada`);
  }

  isSectionValid(section: Section): boolean {
    return section.title.trim() !== '';
  }

  openQuestionTypeSelector(sectionId: number) {
    const section = this.sections.find(sec => sec.id === sectionId);
    if (section) {
      section.showQuestionTypeSelector = !section.showQuestionTypeSelector;
    }
  }

  addOpenQuestionInput(sectionId: number) {
    const section = this.sections.find(sec => sec.id === sectionId);
    if (section) {
      section.questions.push({
        text: '',
        type: 'abierta',
        options: []
      });
      alert(`Se ha añadido una nueva pregunta abierta en la sección ${sectionId}`);
    }
  }

  addMultipleChoiceQuestionInput(sectionId: number) {
    const section = this.sections.find(sec => sec.id === sectionId);
    if (section) {
      section.questions.push({
        text: '',
        type: 'multiple',
        options: [{ text: '' }]
      });
      alert(`Se ha añadido una nueva pregunta múltiple en la sección ${sectionId}`);
    }
  }

  addOption(sectionId: number, question: Question) {
    question.options.push({ text: '' });
  }

  deleteOption(sectionId: number, question: Question, option: Option) {
    question.options = question.options.filter(opt => opt !== option);
  }

  saveQuestion(sectionId: number, question: Question, qIndex: number, sIndex: number) {
    if (this.isQuestionValid(question)) {
      const section = this.sections.find(sec => sec.id === sectionId);
      if (section) {
        section.expandedQuestionIndex = null; // Cierra la tarjeta de la pregunta
        alert('Pregunta guardada');
      }
    } else {
      alert('Debe rellenar todos los campos de la pregunta.');
    }
  }

  isQuestionValid(question: Question): boolean {
    if (question.type === 'multiple') {
      return question.text.trim() !== '' && question.options.every(option => option.text.trim() !== '');
    } else {
      return question.text.trim() !== '';
    }
  }

  deleteQuestion(sectionId: number, question: Question) {
    const section = this.sections.find(sec => sec.id === sectionId);
    if (section) {
      section.questions = section.questions.filter(q => q !== question);
    }
  }

  logOut() {
    this.router.navigate(['/login']);
  }
}
