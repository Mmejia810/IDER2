import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestasTablaComponent } from './encuestas-tabla.component';

const routes: Routes = [{ path: '', component: EncuestasTablaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestasTablaRoutingModule { }
