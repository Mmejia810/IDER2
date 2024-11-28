import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoverPasswordComponent } from './recover-password.component';
import { RecoverPasswordRoutingModule } from '../recover-password/recover-routing.module'; // Importar el routing module

@NgModule({
  declarations: [RecoverPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecoverPasswordRoutingModule 
  ]
})
export class RecoverPasswordModule { }
