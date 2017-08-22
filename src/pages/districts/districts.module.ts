import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Districts } from './districts';

@NgModule({
  declarations: [
    Districts,
  ],
  imports: [
    IonicPageModule.forChild(Districts),
  ],
  exports: [
    Districts
  ]
})
export class DistrictsModule {}
