import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responder-encuesta',
  templateUrl: './responder-encuesta.component.html',
  styleUrls: ['./responder-encuesta.component.css']
})
export class ResponderEncuestaComponent implements OnInit {

  respuestaForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.respuestaForm = this.fb.group({
      respuesta: ['', [Validators.required, Validators.minLength(3)]],
      usuario: this.fb.group({
        id: [1, Validators.required]  
      }),
      seccionEncuesta: this.fb.group({
        id: [134, Validators.required]  
      }),
      pregunta: this.fb.group({
        id: [68, Validators.required]  
      }),
      opciones: [[]]  
    });
  }

  enviarRespuesta(): void {
    if (this.respuestaForm.valid) {
      const respuesta = this.respuestaForm.value;
      this.http.post('http://localhost:9085/respuestas', respuesta).subscribe({
        next: (data) => {
          console.log('Respuesta enviada', data);
          this.router.navigate(['/gracias']);  
        },
        error: (err) => {
          console.error('Error al enviar respuesta', err);
        }
      });
    }
  }
}
