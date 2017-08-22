import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPass } from './forget-pass';

@NgModule({
  declarations: [
    ForgetPass,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPass),
  ],
  exports: [
    ForgetPass
  ]
})
export class LoginModule {}
