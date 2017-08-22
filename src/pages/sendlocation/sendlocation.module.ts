import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendLocation } from './sendlocation';

@NgModule({
  declarations: [
    SendLocation,
  ],
  imports: [
    IonicPageModule.forChild(SendLocation),
  ],
  exports: [
    SendLocation
  ]
})
export class ReservationModule {}
