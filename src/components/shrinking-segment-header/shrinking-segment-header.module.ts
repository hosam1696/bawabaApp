import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShrinkingSegmentHeaderComponent } from './shrinking-segment-header';

@NgModule({
  declarations: [
    ShrinkingSegmentHeaderComponent,
  ],
  imports: [
    IonicPageModule.forChild(ShrinkingSegmentHeaderComponent),
  ],
  exports: [
    ShrinkingSegmentHeaderComponent
  ]
})
export class ShrinkingSegmentHeaderComponentModule {}
