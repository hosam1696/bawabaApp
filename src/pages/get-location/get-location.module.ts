import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetLocation } from './get-location';

@NgModule({
  declarations: [
    GetLocation,
  ],
  imports: [
    IonicPageModule.forChild(GetLocation),
  ],
  exports: [
    GetLocation
  ]
})
export class DistrictsModule {}
