import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefaultPage } from './default-page';

@NgModule({
  declarations: [
    DefaultPage,
  ],
  imports: [
    IonicPageModule.forChild(DefaultPage),
  ],
  exports: [
    DefaultPage
  ]
})
export class DefaultPageModule {}
