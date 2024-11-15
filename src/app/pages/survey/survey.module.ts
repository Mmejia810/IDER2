// survey.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module'; // Asegúrate de importar el SharedModule aquí
import { SurveyService } from '../../services/survey.service';
import { SidebarModule } from '../../sidebar/sidebar.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [SurveyComponent],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule, // Importa SharedModule aquí
    SidebarModule,
    MatExpansionModule,
    MatIconModule
  ],
  providers: [SurveyService]
})
export class SurveyModule {}
