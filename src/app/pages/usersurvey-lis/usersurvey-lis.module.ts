import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersurveyLisComponent } from './usersurvey-lis.component';
import { SidebarModule } from '../../sidebar/sidebar.module';
import { SharedModule } from '../../shared/shared.module'; 
import { SurveyService } from '../../services/survey.service';
import { FormsModule } from '@angular/forms';


import { UserSurveyLisRoutingModule } from './usersurvey-lis-routing.module';
import { SidebaruserModule } from "../../services/userservices/sidebaruser/sidebaruser.module";

@NgModule({
  declarations: [UsersurveyLisComponent],
  imports: [
    CommonModule,
    SidebarModule,
    SharedModule,
    UserSurveyLisRoutingModule,
    SidebaruserModule,
    FormsModule
],
  providers: [SurveyService]
})
export class UserSurveyLisModule {}