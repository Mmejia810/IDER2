import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isPasswordVisible: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        pass: this.loginForm.value.password
      };

      console.log('Enviando credenciales:', credentials);

      this.authService.login(credentials).subscribe(
        (response) => {
          console.log('Respuesta del backend:', response);

          if (
            response.message === 'Login successful' &&
            response.userId &&
            response.role
          ) {
            localStorage.setItem('userId', response.userId.toString());
            localStorage.setItem('token', 'true'); // <- clave para AuthGuard

            if (response.role === 'Administrador') {
              this.router.navigate(['/home']);
            } else if (response.role === 'usuario') {
              this.router.navigate(['/homeuser']);
            } else {
              console.error('Rol desconocido:', response.role);
            }
          } else {
            this.errorMessage = 'Error: No se recibió la información esperada.';
            console.error(this.errorMessage);
          }
        },
        (error) => {
          console.error('Error de login', error);
          this.errorMessage = 'Error en el servidor o credenciales incorrectas.';
        }
      );
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToRecoverPassword(): void {
    this.router.navigate(['/recover-password']);
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
