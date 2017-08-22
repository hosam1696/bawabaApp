import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutesEditPage } from './routes-edit';

@NgModule({
  declarations: [
    RoutesEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RoutesEditPage),
  ],
  exports: [
    RoutesEditPage
  ]
})
export class RoutesEditPageModule {}
