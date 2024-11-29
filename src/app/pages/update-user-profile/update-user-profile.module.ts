import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateUserProfileComponent } from './update-user-profile.component';
import { UpdateUserProfileRoutingModule } from './update-user-profile-routing.module';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { SharedModule } from '../../shared/shared.module';
import { SidebarModule } from '../../sidebar/sidebar.module';
@NgModule({
  declarations: [UpdateUserProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    SidebarModule,
    FormsModule, // Asegúrate de agregar FormsModule
    UpdateUserProfileRoutingModule
  ]
})
export class UpdateUserProfileModule { }
