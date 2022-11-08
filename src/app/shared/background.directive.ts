import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective {

  @HostBinding('style.background-color') background:string;
  @HostBinding('style.color') color:string;


  constructor() { }

 @HostListener('click') click() {
  this.background = 'black'
  this.color = 'white'

 }

}
