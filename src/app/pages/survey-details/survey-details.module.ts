import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyDetailsComponent } from './survey-details.component';
import { SidebarModule } from '../../sidebar/sidebar.module';
import { SharedModule } from '../../shared/shared.module'; 
import { SurveyService } from '../../services/survey.service';


import { SurveyDetailsRoutingModule } from './survey-details-routing.module'; 

@NgModule({
  declarations: [SurveyDetailsComponent],
  imports: [
    CommonModule,
    SidebarModule,
    SharedModule,
    
    SurveyDetailsRoutingModule 
  ],
  providers: [SurveyService]
})
export class SurveyDetailsModule {}
