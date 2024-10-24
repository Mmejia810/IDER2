import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './input-field.component'; // Ensure this path is correct
import { ButtonComponent } from '../button/button.component'; // Ensure this path is correct

@NgModule({
  declarations: [
    InputFieldComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputFieldComponent,
    ButtonComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
