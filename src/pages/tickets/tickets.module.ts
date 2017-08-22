import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tickets } from './tickets';

@NgModule({
  declarations: [
    Tickets,
  ],
  imports: [
    IonicPageModule.forChild(Tickets),
  ],
  exports: [
    Tickets
  ]
})
export class SettingsModule {}
