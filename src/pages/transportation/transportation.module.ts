import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Transportation } from './transportation';

@NgModule({
  declarations: [
    Transportation,
  ],
  imports: [
    IonicPageModule.forChild(Transportation),
  ],
  exports: [
    Transportation
  ]
})
export class SettingsModule {}
