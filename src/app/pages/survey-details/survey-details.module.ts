import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyDetailsComponent } from './survey-details.component';
import { SidebarModule } from '../../sidebar/sidebar.module';
import { SharedModule } from '../../shared/shared.module'; 
import { SurveyService } from '../../services/survey.service';


import { SurveyDetailsRoutingModule } from './survey-details-routing.module'; // Asegúrate de importar correctamente el módulo de rutas

@NgModule({
  declarations: [SurveyDetailsComponent],
  imports: [
    CommonModule,
    SidebarModule,
    SharedModule,
    
    SurveyDetailsRoutingModule // Este es el módulo de rutas que configura la navegación de esta página
  ],
  providers: [SurveyService]
})
export class SurveyDetailsModule {}
