// src/app/home/home-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeUserComponent } from './home-user.component';

const routes: Routes = [
  { path: '', component: HomeUserComponent }, // Ruta principal para Home
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Usamos forChild porque es un módulo hijo
  exports: [RouterModule]
})
export class HomeUserRoutingModule {}
