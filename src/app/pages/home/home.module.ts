// src/app/home/home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';  // Asegúrate de importar HomeComponent
import { SidebarModule } from '../../sidebar/sidebar.module';
import { SurveyCardModule } from '../../components/survey-card/survey-card.module';  // Importa SurveyCardModule
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],  // Solo declara el HomeComponent aquí
  imports: [CommonModule, SidebarModule, SurveyCardModule, HomeRoutingModule],  // Importa SurveyCardModule para usar SurveyCardComponent
})
export class HomeModule {}
