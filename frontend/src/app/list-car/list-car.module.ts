import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCarPageRoutingModule } from './list-car-routing.module';

import { ListCarPage } from './list-car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCarPageRoutingModule
  ],
  declarations: [ListCarPage]
})
export class ListCarPageModule {}
