import { Component } from '@angular/core';

/**
 * Generated class for the SmileyBlockComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'smiley-block',
  templateUrl: 'smiley-block.html'
})
export class SmileyBlockComponent {

  public icon1 = '☺︎';
  public icon2 = '✔︎';
  public text1 = 'Press this button if you want to take part in the trial ➜';
  public text2 = "Thanks for your consent!";
  public buttonIcon: string = this.icon1;
  public smileyText: string = this.text1;

  constructor() {
    console.log('Hello SmileyBlockComponent Component');
  }

  toggleSmiley() {
    if (this.buttonIcon === this.icon1) {
      this.buttonIcon = this.icon2;
      this.smileyText = this.text2
    } else {
      this.buttonIcon = this.icon1;
      this.smileyText = this.text1;
    }
  }

}
