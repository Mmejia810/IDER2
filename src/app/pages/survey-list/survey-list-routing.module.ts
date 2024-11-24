import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyListComponent } from './survey-list.component';

const routes: Routes = [
  { path: '', component: SurveyListComponent }, // Ruta vacía para que este módulo sea accesible directamente
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyListRoutingModule {}
