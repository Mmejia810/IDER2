import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersurveyLisComponent } from './usersurvey-lis.component';

const routes: Routes = [
  {
    path: ':id', 
    component: UsersurveyLisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSurveyLisRoutingModule {}