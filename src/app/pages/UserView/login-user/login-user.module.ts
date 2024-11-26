import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginUserComponent } from './login-user.component';
import { LoginUserRoutingModule } from './login-user-routing.module';


@NgModule({
  declarations: [LoginUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginUserRoutingModule // Aquí lo importamos
  ]
})
export class LoginUserModule { }
