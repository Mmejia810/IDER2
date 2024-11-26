import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebaruserComponent } from './sidebaruser.component';

@NgModule({
  declarations: [SidebaruserComponent],
  imports: [
    CommonModule
  ],
  exports: [SidebaruserComponent]  // Exportamos el componente para que pueda ser usado en otros módulos
})
export class SidebaruserModule { }