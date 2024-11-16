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
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  isSidebarActive = false;
  surveyId = 1;
  surveyTitle = '';
  surveyDescription = '';
  startDate: string = '';
  endDate: Date | null = null;
  sections: Section[] = [];
  sectionIdCounter = 1;
  expandedSectionIndex: number | null = null;

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

  isSurveyValid(): boolean {
    return (
      this.surveyTitle.trim() !== '' &&
      this.surveyDescription.trim() !== '' &&
      this.endDate !== null
    );
  }

  saveSurvey() {
    if (!this.isSurveyValid()) {
      alert('Debe rellenar todos los campos de la encuesta antes de guardarla.');
      return;
    }

    const formattedEndDate = this.endDate?.toISOString().slice(0, 10) || '';

    const newSurvey = {
      titulo: this.surveyTitle,
      descripcion: this.surveyDescription,
      estado: 'activa',
      fechaCierre: formattedEndDate,
      usuario: {
        id: 1
      },
    };

    this.surveyService.createSurvey(newSurvey).subscribe(() => {
      alert('Encuesta creada con éxito');
      this.incrementSurveyId();
      this.resetForm();
      this.router.navigate(['/encuestas']);
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
      title: '',
      questions: [],
      showQuestionTypeSelector: false,
    };
    this.sections.push(newSection);
  }

  saveSection(section: Section) {
    if (this.isSectionValid(section)) {
      const sectionData = {
        titulo: section.title,
        encuesta: { id: this.surveyId },
      };

      this.surveyService.saveSection(sectionData).subscribe(
        (response) => {
          alert(`Sección "${section.title}" guardada con éxito`);
          this.resetSectionForm();
        },
        (error) => {
          console.error('Error al guardar la sección:', error);
          alert('Hubo un error al guardar la sección.');
        }
      );
    } else {
      alert('Debe rellenar el título de la sección antes de guardarla.');
    }
  }

  resetSectionForm() {
    this.sections.forEach((section) => {
      section.title = '';
      section.questions = [];
    });
  }

  isSectionValid(section: Section): boolean {
    return section.title.trim() !== '';
  }

  openQuestionTypeSelector(sectionId: number) {
    const section = this.sections.find((sec) => sec.id === sectionId);
    if (section) {
      section.showQuestionTypeSelector = !section.showQuestionTypeSelector;
    }
  }

  addOpenQuestionInput(sectionId: number) {
    const section = this.sections.find((sec) => sec.id === sectionId);
    if (section) {
      section.questions.push({
        text: '',
        type: 'abierta',
        options: [],
      });
      alert(`Se ha añadido una nueva pregunta abierta en la sección ${sectionId}`);
    }
  }

  addMultipleChoiceQuestionInput(sectionId: number) {
    const section = this.sections.find((sec) => sec.id === sectionId);
    if (section) {
      section.questions.push({
        text: '',
        type: 'multiple',
        options: [{ text: '' }],
      });
      alert(`Se ha añadido una nueva pregunta múltiple en la sección ${sectionId}`);
    }
  }

  addOption(sectionId: number, question: Question) {
    question.options.push({ text: '' });
  }

  deleteOption(sectionId: number, question: Question, option: Option) {
    question.options = question.options.filter((opt) => opt !== option);
  }

  saveQuestion(sectionId: number, question: Question, qIndex: number, sIndex: number) {
    if (this.isQuestionValid(question)) {
      this.surveyService.createQuestion(this.surveyId, sectionId, question).subscribe(
        () => {
          alert(`Pregunta guardada en la sección ${sectionId}, pregunta ${qIndex + 1}`);
        },
        (error) => {
          alert('Hubo un error al guardar la pregunta.');
          console.error(error);
        }
      );
    } else {
      alert('Debe rellenar todos los campos de la pregunta.');
    }
  }

  isQuestionValid(question: Question): boolean {
    return (
      question.text.trim() !== '' &&
      (question.type !== 'multiple' ||
        question.options.every((option) => option.text.trim() !== ''))
    );
  }

  deleteQuestion(sectionId: number, question: Question) {
    const section = this.sections.find((sec) => sec.id === sectionId);
    if (section) {
      section.questions = section.questions.filter((q) => q !== question);
    }
  }

  deleteSection(sectionId: number) {
    this.sections = this.sections.filter((section) => section.id !== sectionId);
  }

  logOut() {
    this.router.navigate(['/login']);
  }
}
