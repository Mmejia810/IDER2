import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service'; // Asegúrate de tener el servicio correctamente importado
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isPasswordVisible: boolean = false;  // Controla la visibilidad de la contraseña
  errorMessage: string | null = null; // Propiedad para el mensaje de error

  // Uso del operador de aserción "!" para indicar que se inicializará correctamente
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Cambié de 'username' a 'email'
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        pass: this.loginForm.value.password
      };
  
      this.authService.login(credentials).subscribe(
        (response: string) => {
          console.log('Login exitoso', response);
  
          // Verifica si la respuesta es "Login successful" y maneja el flujo
          if (response === 'Login successful') {
            // Si es exitoso, redirige y almacena el token (suponiendo que lo recibes del backend)
            // Aquí deberías obtener el token si el backend lo devuelve y guardarlo
            localStorage.setItem('authToken', 'your-jwt-token'); // Ejemplo de almacenamiento del token
            this.router.navigate(['/home']);
          } else {
            // Si no es "Login successful", muestra un mensaje de error
            this.errorMessage = 'Error: No se recibió el token de autenticación.';
            console.error(this.errorMessage);
          }
        },
        (error: any) => {
          console.error('Error de login', error);
          this.errorMessage = 'Error en el servidor o credenciales incorrectas.';
        }
      );
    }
  }

  // Navegar al registro
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Navegar a la recuperación de contraseña
  goToRecoverPassword() {
    this.router.navigate(['/recover-password']);
  }

  // Alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
