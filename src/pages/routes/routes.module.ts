import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Routes } from './routes';

@NgModule({
  declarations: [
    Routes,
  ],
  imports: [
    IonicPageModule.forChild(Routes),
  ],
  exports: [
    Routes
  ]
})
export class RoutesModule {}
