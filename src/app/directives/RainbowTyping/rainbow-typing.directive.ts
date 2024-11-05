import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appRainbowTyping]',
})
export class RainbowTypingDirective {

  //table de couleurs
  colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  @HostBinding("style.color")color = 'blue';
  @HostBinding("style.borderColor")borderColor ='yellow';

  changeColor() {
    const color = this.colors[Math.floor(Math.random()* this.colors.length)];
    this.color = color;
    this.borderColor= color;
  }

  constructor() {
    this.changeColor();
   }

   @HostListener('keyup') onKeyUp(){
    this.changeColor();
   }


}
