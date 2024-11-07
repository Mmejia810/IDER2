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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  showToast() {
    this.toastSer.show('Esto es un mensaje de prueba');
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response: any) => {
          console.log('Registro exitoso', response);
        },
        (error: any) => {
          console.error('Error en el registro', error);
        }
      );
    }
  }

  goToLogin() {
    this.router.navigate(['/login']); // Método para redirigir al login
  }
}
