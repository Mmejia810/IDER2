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
  endDate: string = '';
  sections: Section[] = [];
  sectionTitle: string = '';

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

  addSection() {
    const newSection: Section = {
      id: this.sections.length + 1,
      title: `Sección ${this.sections.length + 1}`,
      questions: []
    };
    this.sections.push(newSection);
  }

  saveSection(section: Section) {
    alert(`Sección ${section.title} guardada con éxito`);
  }

  deleteSection(sectionId: number) {
    this.sections = this.sections.filter(section => section.id !== sectionId);
    alert(`Sección ${sectionId} eliminada`);
  }

  askQuestionType(sectionId: number) {
    const questionType = prompt('¿Qué tipo de pregunta deseas agregar? (abierta / multiple)');
    if (questionType === 'abierta') {
      this.addOpenQuestion(sectionId);
    } else if (questionType === 'multiple') {
      this.addMultipleChoiceQuestion(sectionId);
    } else {
      alert('Tipo de pregunta no válido. Solo se permiten "abierta" o "multiple".');
    }
  }

  addOpenQuestion(sectionId: number) {
    const section = this.sections.find(sec => sec.id === sectionId);
    if (section) {
      section.questions.push({ text: '', type: 'abierta', options: [] });
    }
  }

  addMultipleChoiceQuestion(sectionId: number) {
    const section = this.sections.find(sec => sec.id === sectionId);
    if (section) {
      section.questions.push({ text: '', type: 'multiple', options: [{ text: '' }] });
    }
  }

  saveQuestion(sectionId: number, question: Question) {
    const questionData = {
      text: question.text || '', // Ensure text is not null
      type: question.type,
      options: question.options
    };

    // Call the SurveyService to save the question
    this.surveyService.createQuestion(this.surveyId, sectionId, questionData).subscribe(response => {
      alert('Pregunta guardada con éxito');
    });
  }

  deleteQuestion(sectionId: number, question: Question) {
    const section = this.sections.find(sec => sec.id === sectionId);
    if (section) {
      section.questions = section.questions.filter(q => q !== question);
      alert('Pregunta eliminada');
    }
  }

  addOption(sectionId: number, question: Question) {
    if (question.type === 'multiple') {
      question.options.push({ text: '' });
    }
  }

  deleteOption(sectionId: number, question: Question, option: Option) {
    const section = this.sections.find(sec => sec.id === sectionId);
    if (section) {
      const questionToUpdate = section.questions.find(q => q === question);
      if (questionToUpdate) {
        questionToUpdate.options = questionToUpdate.options.filter(opt => opt !== option);
        alert('Opción eliminada');
      }
    }
  }

  saveSurvey() {
    alert('Encuesta creada con éxito');
    this.incrementSurveyId();
    this.resetForm();
  }

  incrementSurveyId() {
    this.surveyId += 1;
  }

  resetForm() {
    this.surveyTitle = '';
    this.surveyDescription = '';
    this.endDate = '';
    this.sections = [];
  }

  logOut() {
    this.router.navigate(['/login']);
  }
}
