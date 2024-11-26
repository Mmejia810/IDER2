// src/app/home/home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUserComponent } from './home-user.component';
import { SidebarModule } from '../../../sidebar/sidebar.module';
import { HomeUserRoutingModule } from './home-user-routing-module';
import { SurveyListModule } from '../../survey-list/survey-list.module';

@NgModule({
  declarations: [HomeUserComponent],  // Solo declara el HomeComponent aquí
  imports: [CommonModule, SidebarModule, HomeUserRoutingModule, SurveyListModule],  // Importa SurveyCardModule para usar SurveyCardComponent
})
export class HomeUserModule {}