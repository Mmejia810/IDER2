import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowCredentialsComponent } from './show-credentials.component';

const routes: Routes = [
  {
    path: '',
    component: ShowCredentialsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowCredentialsRoutingModule {}
