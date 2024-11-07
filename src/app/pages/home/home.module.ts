import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module'; // Mantén esta importación

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule, // Agrega FormsModule aquí si lo necesitas
    SharedModule // Asegúrate de incluir el SharedModule
  ]
})
export class HomeModule { }
