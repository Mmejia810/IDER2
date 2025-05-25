
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';  
import { SidebarModule } from '../../sidebar/sidebar.module';
import { SurveyCardModule } from '../../components/survey-card/survey-card.module';  
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],  
  imports: [CommonModule, SidebarModule, SurveyCardModule, HomeRoutingModule],
})
export class HomeModule {}
