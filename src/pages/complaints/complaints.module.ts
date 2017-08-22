import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Complaints } from './complaints';

@NgModule({
  declarations: [
    Complaints,
  ],
  imports: [
    IonicPageModule.forChild(Complaints),
  ],
  exports: [
    Complaints
  ]
})
export class SettingsModule {}
