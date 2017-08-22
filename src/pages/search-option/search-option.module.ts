import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchOption  } from './search-option';

@NgModule({
  declarations: [
    SearchOption,
  ],
  imports: [
    IonicPageModule.forChild(SearchOption),
  ],
  exports: [
    SearchOption
  ]
})
export class SettingsModule {}
