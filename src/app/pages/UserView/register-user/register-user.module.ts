import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './register-user.component';
import { RegisterUserRoutingModule } from './register-user-routing.module';

@NgModule({
  declarations: [RegisterUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterUserRoutingModule // Aquí lo importamos
  ]
})
export class RegisterUserModule { }
