import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsDetail } from './notifications-detail';

@NgModule({
  declarations: [
    NotificationsDetail,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsDetail),
  ],
  exports: [
    NotificationsDetail
  ]
})
export class SettingsModule {}
