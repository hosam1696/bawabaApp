import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyPath } from './company-path';

@NgModule({
  declarations: [
    CompanyPath,
  ],
  imports: [
    IonicPageModule.forChild(CompanyPath),
  ],
  exports: [
    CompanyPath
  ]
})
export class SettingsModule {}
