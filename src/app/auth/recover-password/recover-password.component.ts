import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Verifica que la ruta del servicio esté correcta

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  recoverForm!: FormGroup; // Operador ! para asegurar inicialización antes de uso

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    // Inicializa el FormGroup con las validaciones necesarias
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: ['', Validators.required] // Campo adicional para el código de verificación
    });
  }

  onSubmit() {
    if (this.recoverForm.valid) {
      // Llamada al servicio de recuperación de contraseña
      this.authService.recoverPassword(this.recoverForm.value).subscribe(
        (response: any) => {
          console.log('Recuperación exitosa', response);
          // Lógica para manejar el éxito de la recuperación
        },
        (error: any) => {
          console.error('Error en la recuperación de contraseña', error);
          // Manejo de errores
        }
      );
    }
  }
}
