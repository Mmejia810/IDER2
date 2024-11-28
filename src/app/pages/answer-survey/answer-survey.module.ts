import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerSurveyComponent } from './answer-survey.component';
import { AnswerSurveyRoutingModule } from './answer-survey-routing.module';
import { SidebaruserModule } from "../../services/userservices/sidebaruser/sidebaruser.module";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AnswerSurveyComponent],
  imports: [
    CommonModule,
    AnswerSurveyRoutingModule,
    SidebaruserModule,
    FormsModule
],
  exports: [AnswerSurveyComponent]  // Exportamos el componente para que pueda ser usado en otros módulos
})
export class AnswerSurveyModule { }