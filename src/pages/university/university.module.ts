import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { University } from './university';

@NgModule({
  declarations: [
    University,
  ],
  imports: [
    IonicPageModule.forChild(University),
  ],
  exports: [
    University
  ]
})
export class UniversityModule {}
