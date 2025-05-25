// surveyModels.ts

export interface Survey {
  id: number;
  name: string;
  title: string;
  description: string;
  startDate: Date;  // Usando Date para manejo de fechas
  endDate: Date;    // Usando Date para manejo de fechas
  createdAt: Date;  // Usando Date para manejo de fechas
  state: string;
  sections: Section[];
}

export interface Section {
  id: number;
  titulo: string;
  seccionId: string;  // Asegúrate de que seccionId sea único para cada sección
  encuestaId: number;
  // Relación con preguntas
  questions: Question[];
}

export interface Question {
  questionId: number;  // Identificador único para la pregunta
  id: number;  // Puede ser el ID único de la pregunta
  texto: string;  // El texto de la pregunta
  seccionId: number;  // Relación con la sección (ID de la sección)
  titulo: string;  // Título de la pregunta
  options: Option[];  // Lista de opciones asociadas a la pregunta
}

export interface Option {
  id: number;  // Identificador único para la opción
  optionId: number;  // Identificador único para la opción
  texto: string;  // El texto de la opción
  questionId: number;  // Relación con la pregunta
  titulo: string;  // Título de la opción
}

export interface Respuesta {
  usuario: string;
  email: string;
  seccion: string;
  pregunta: string;
  tipoPregunta: string;
  respuesta: string;
  opciones: string[];
}

