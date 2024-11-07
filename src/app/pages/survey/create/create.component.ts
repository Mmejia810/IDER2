import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  surveyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router
  ) {
    // Inicializamos el formulario con validaciones básicas
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.surveyForm.valid) {
      // Enviar datos al servicio para crear una nueva encuesta
      this.surveyService.createSurvey(this.surveyForm.value).subscribe({
        next: (response) => {
          console.log('Encuesta creada:', response);
          this.router.navigate(['/']); // Redirigir al inicio o página deseada
        },
        error: (error) => {
          console.error('Error al crear la encuesta:', error);
        }
      });
    }
  }
}
