import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutesViewPage } from './routes-view';

@NgModule({
  declarations: [
    RoutesViewPage,
  ],
  imports: [
    IonicPageModule.forChild(RoutesViewPage),
  ],
  exports: [
    RoutesViewPage
  ]
})
export class RoutesViewPageModule {}
