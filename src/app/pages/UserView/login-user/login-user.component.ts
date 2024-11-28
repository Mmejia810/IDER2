import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service'; // Asegúrate de tener el servicio correctamente importado
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent implements OnInit{
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
        (response) => { // Ya no es necesario especificar el tipo explícitamente
          console.log('Login exitoso', response);
  
          // Verifica si la respuesta tiene 'message' y 'userId'
          if (response.message === 'Login successful' && response.userId) {
            // Almacenar el userId en localStorage
            localStorage.setItem('userId', response.userId.toString()); // Guardamos el userId en localStorage
  
            // Si se espera un token JWT o algo similar, puedes almacenarlo aquí
            // localStorage.setItem('authToken', 'your-jwt-token'); // Si tienes un token para almacenar
  
            this.router.navigate(['/home']);
          } else {
            // Si no es "Login successful", muestra un mensaje de error
            this.errorMessage = 'Error: No se recibió el userId o el mensaje de login.';
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
