import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service'; 

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  recoverForm!: FormGroup; 

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: ['', Validators.required] 
    });
  }

  onSubmit() {
    if (this.recoverForm.valid) {
      this.authService.recoverPassword(this.recoverForm.value).subscribe(
        (response: any) => {
          console.log('Recuperación exitosa', response);
        },
        (error: any) => {
          console.error('Error en la recuperación de contraseña', error);
        }
      );
    }
  }
}
