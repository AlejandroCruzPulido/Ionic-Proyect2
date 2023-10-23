import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCarPage } from './list-car.page';

const routes: Routes = [
  {
    path: '',
    component: ListCarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCarPageRoutingModule {}
