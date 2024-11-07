import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { InputFieldComponent } from './input-field/input-field.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    ReactiveFormsModule,
    InputFieldComponent // Exporta los componentes para usarlos en otros módulos
  ]
})
export class SharedModule { }
