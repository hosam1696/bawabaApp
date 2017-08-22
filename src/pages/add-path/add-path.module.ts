import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPath  } from './add-path';

@NgModule({
  declarations: [
    AddPath,
  ],
  imports: [
    IonicPageModule.forChild(AddPath),
  ],
  exports: [
    AddPath
  ]
})
export class SettingsModule {}
