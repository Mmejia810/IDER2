import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateSurveyComponent } from './update-survey.component';

const routes: Routes = [
  { path: '', component: UpdateSurveyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateSurveyRoutingModule {}
