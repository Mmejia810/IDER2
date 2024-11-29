import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserProfileComponent } from './update-user-profile.component';

const routes: Routes = [{ path: '', component: UpdateUserProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateUserProfileRoutingModule { }
