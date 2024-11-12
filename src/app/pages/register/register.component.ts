import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ToastmService } from '../../shared/services/toast/toastm.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Aserción no definida aún
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastSer: ToastmService) {
    this.registerForm = this.fb.group({
      identificacion: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Validación para identificación
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      estado: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response: any) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/login']); // Redirigir al login después de registro exitoso
        },
        (error: any) => {
          console.error('Error en el registro', error);
        }
      );
    }
  }

  logOut() {
    this.router.navigate(['/login']); // Redirigir al login cuando se hace clic en el icono de cerrar sesión
  }
}
