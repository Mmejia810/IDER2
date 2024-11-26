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
  titulo: string;
  seccionId: string;  // Asegúrate de que este campo coincida


  // Agrega otros campos según tu modelo de datos
}

export interface Question {
  questionId: string;  // Asegúrate de que este campo coincida
  id: number;
  texto: string;
  seccionId: number; // Relación con la sección
  // Agrega otros campos según tu modelo de datos
}

export interface Option {
  id: number;
  optionId: string;  // Asegúrate de que este campo coincida
  texto: string;
  questionId: string;  // Asegúrate de que esta propiedad esté aquí
  // Agrega otros campos según tu modelo de datos
}
