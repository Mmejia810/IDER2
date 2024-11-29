import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SurveyListComponent } from './survey-list.component';
import { SurveyListRoutingModule } from './survey-list-routing.module';
import { SharedModule } from '../../shared/shared.module';  
import { MatCardModule } from '@angular/material/card';  
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';  
import { SurveyCardModule } from '../../components/survey-card/survey-card.module';  
import { SidebarModule } from '../../sidebar/sidebar.module';


@NgModule({
  declarations: [
    SurveyListComponent,  
  ],
  imports: [
    CommonModule,
    FormsModule,
    SurveyListRoutingModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    SidebarModule,
    SurveyCardModule,  
  ],
})
export class SurveyListModule {}