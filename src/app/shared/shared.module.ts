import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Añadido FormsModule
import { ButtonComponent } from './button/button.component';
import { InputFieldComponent } from './input-field/input-field.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,       // Importa FormsModule si necesitas trabajar con formularios en otros módulos
    ReactiveFormsModule // Para formularios reactivos
  ],
  exports: [
    ButtonComponent,
    InputFieldComponent, // Exporta los componentes para usarlos en otros módulos
    ReactiveFormsModule,
    FormsModule          // Exporta FormsModule también para su uso en otros módulos
  ]
})
export class SharedModule {}
