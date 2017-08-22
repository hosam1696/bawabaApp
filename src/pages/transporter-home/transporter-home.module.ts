import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransporterHome } from './transporter-home';

@NgModule({
  declarations: [
    TransporterHome,
  ],
  imports: [
    IonicPageModule.forChild(TransporterHome),
  ],
  exports: [
    TransporterHome
  ]
})
export class TransporterHomeModule {}
