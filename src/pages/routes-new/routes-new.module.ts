import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutesNewPage } from './routes-new';

@NgModule({
  declarations: [
    RoutesNewPage,
  ],
  imports: [
    IonicPageModule.forChild(RoutesNewPage),
  ],
  exports: [
    RoutesNewPage
  ]
})
export class RoutesNewPageModule {}
