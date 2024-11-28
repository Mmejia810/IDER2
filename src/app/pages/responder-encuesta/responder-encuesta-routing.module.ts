import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponderEncuestaComponent } from './responder-encuesta.component';

const routes: Routes = [
  { path: '', component: ResponderEncuestaComponent }  // Define la ruta predeterminada
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponderEncuestaRoutingModule { }
