import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintsReply } from './complaints-reply';

@NgModule({
  declarations: [
    ComplaintsReply,
  ],
  imports: [
    IonicPageModule.forChild(ComplaintsReply),
  ],
  exports: [
    ComplaintsReply
  ]
})
export class ContactusModule {}
