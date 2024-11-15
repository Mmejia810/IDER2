// surveyModels.ts

export interface Survey {
  id: number;
  name: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  sections: Section[];
}

export interface Section {
  id: number;
  title: string;
  questions: Question[];  // Cambiado de string[] a Question[]
}

export interface Question {
  text: string;
  type: 'abierta' | 'multiple';
  options: Option[];
}

export interface Option {
  text: string;
}
