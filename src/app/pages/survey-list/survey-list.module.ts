import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SurveyListComponent } from './survey-list.component';
import { SurveyListRoutingModule } from './survey-list-routing.module';
import { SharedModule } from '../../shared/shared.module';  // Si tienes inputs y botones reutilizables
import { MatCardModule } from '@angular/material/card';  // Si usas material design
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';  // Para el dropdown
import { SurveyCardModule } from '../../components/survey-card/survey-card.module';  // Importa SurveyCardModule aquí
import { SidebarModule } from '../../sidebar/sidebar.module';


@NgModule({
  declarations: [
    SurveyListComponent,  // Componente principal de la lista
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
    SurveyCardModule,  // Asegúrate de que SurveyCardModule esté importado aquí
  ],
})
export class SurveyListModule {}
