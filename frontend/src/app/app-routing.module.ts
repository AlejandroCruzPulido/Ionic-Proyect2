import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-car',
    pathMatch: 'full'
  },
  {
    path: 'add-car',
    loadChildren: () => import('./add-car/add-car.module').then( m => m.AddCarPageModule)
  },
  {
    path: 'list-car',
    loadChildren: () => import('./list-car/list-car.module').then( m => m.ListCarPageModule)
  },
  {
    path: 'update-car/:id',
    loadChildren: () => import('./update-car/update-car.module').then( m => m.UpdateCarPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
