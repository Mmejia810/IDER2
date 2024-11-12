// src/app/models/survey.model.ts
export interface Survey {
    id: string;
    name: string;
    description?: string;  // Propiedad opcional
    createdAt?: Date;      // Propiedad opcional
    updatedAt?: Date;      // Propiedad opcional
    dateCreated?: Date;    // Propiedad opcional
  }
  