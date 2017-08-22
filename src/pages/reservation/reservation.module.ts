import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Reservation } from './reservation';

@NgModule({
  declarations: [
    Reservation,
  ],
  imports: [
    IonicPageModule.forChild(Reservation),
  ],
  exports: [
    Reservation
  ]
})
export class ReservationModule {}
