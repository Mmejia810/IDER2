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

  // Uso del operador de aserción "!" para indicar que se inicializará correctamente
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  // Método para manejar el formulario al enviarlo
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {  // Especificar el tipo `any` para el parámetro `response`
          console.log('Login exitoso', response);
          // Manejar redirección o almacenamiento del token
        },
        (error: any) => {  // Especificar el tipo `any` para el parámetro `error`
          console.error('Error de login', error);
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
