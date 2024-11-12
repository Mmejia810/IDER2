// src/app/home/home-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal para Home
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Usamos forChild porque es un módulo hijo
  exports: [RouterModule]
})
export class HomeRoutingModule {}
