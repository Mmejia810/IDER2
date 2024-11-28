// src/app/home/home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUserComponent } from './home-user.component';
import { HomeUserRoutingModule } from './home-user-routing-module';
import { SidebaruserModule } from '../../../services/userservices/sidebaruser/sidebaruser.module';
import { AnswerSurveyModule } from '../../answer-survey/answer-survey.module';

@NgModule({
  declarations: [HomeUserComponent],  // Solo declara el HomeComponent aquí
  imports: [CommonModule,  HomeUserRoutingModule, AnswerSurveyModule, SidebaruserModule],  // Importa SurveyCardModule para usar SurveyCardComponent
})
export class HomeUserModule {}