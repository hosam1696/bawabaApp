import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPath  } from './edit-path';

@NgModule({
  declarations: [
    EditPath,
  ],
  imports: [
    IonicPageModule.forChild(EditPath),
  ],
  exports: [
    EditPath
  ]
})
export class SettingsModule {}
