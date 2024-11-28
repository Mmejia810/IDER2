import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowCredentialsRoutingModule } from './show-credentials-routing.module';
import { ShowCredentialsComponent } from './show-credentials.component';
import { SidebarModule } from '../../sidebar/sidebar.module'; 

@NgModule({
  declarations: [ShowCredentialsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShowCredentialsRoutingModule,
    SidebarModule, 
  ]
})
export class ShowCredentialsModule { }
