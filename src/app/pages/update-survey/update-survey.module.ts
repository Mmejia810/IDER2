import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SurveyService } from '../../services/survey.service';
import { FormsModule } from '@angular/forms';
import { SurveyCardModule } from '../../components/survey-card/survey-card.module';  
import { SidebarModule } from '../../sidebar/sidebar.module'; 



import { UpdateSurveyRoutingModule } from './update-survey-routing.module';
import { UpdateSurveyComponent } from './update-survey.component'; 

@NgModule({
  declarations: [UpdateSurveyComponent], 
  imports: [
    CommonModule,
    UpdateSurveyRoutingModule,
    SharedModule,
    FormsModule,
    SurveyCardModule,
    SidebarModule
    
  ],
  providers: [SurveyService]
})
export class UpdateSurveyModule {}
