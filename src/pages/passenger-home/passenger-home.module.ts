import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerHome } from './passenger-home';

@NgModule({
  declarations: [
    PassengerHome,
  ],
  imports: [
    IonicPageModule.forChild(PassengerHome),
  ],
  exports: [
    PassengerHome
  ]
})
export class PassengerHomeModule {}
