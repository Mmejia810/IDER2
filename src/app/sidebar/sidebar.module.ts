import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule
  ],
  exports: [SidebarComponent]  // Exportamos el componente para que pueda ser usado en otros módulos
})
export class SidebarModule { }
