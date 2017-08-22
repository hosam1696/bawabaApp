// Main Components
import { Component, Input, ElementRef, Renderer } from '@angular/core';

// Providers

// Req Pages

@Component({
  selector: 'shrinking-segment-header',
  templateUrl: 'shrinking-segment-header.html'
})
export class ShrinkingSegmentHeaderComponent {

  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;
  newHeaderHeight: any;

  text: string;

  constructor(
    public element: ElementRef,
    public renderer: Renderer
  ) {
    console.log('Hello ShrinkingSegmentHeaderComponent Component');
    this.text = 'Hello World';
  }

  ngAfterViewInit() {

    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');

    this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
    });

  }

  resizeHeader(ev){
 
    ev.domWrite(() => {
 
      this.newHeaderHeight = this.headerHeight - ev.scrollTop;
 
      if(this.newHeaderHeight < 0){
        this.newHeaderHeight = 0;
      }   
 
      this.renderer.setElementStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
 
    });
 
  }



}
