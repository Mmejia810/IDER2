import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponderEncuestaRoutingModule } from './responder-encuesta-routing.module';
import { ResponderEncuestaComponent } from './responder-encuesta.component';
import { ReactiveFormsModule } from '@angular/forms';  

@NgModule({
  declarations: [
    ResponderEncuestaComponent
  ],
  imports: [
    CommonModule,
    ResponderEncuestaRoutingModule,
    ReactiveFormsModule  
  ]
})
export class ResponderEncuestaModule { }
