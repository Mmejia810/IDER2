import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasTablaRoutingModule } from './encuestas-tabla-routing.module';
import { EncuestasTablaComponent } from './encuestas-tabla.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [EncuestasTablaComponent],
  imports: [
    CommonModule,
    EncuestasTablaRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NgChartsModule,

  ]
})
export class EncuestasTablaModule { }
