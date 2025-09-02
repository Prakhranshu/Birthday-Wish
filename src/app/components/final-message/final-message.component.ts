import { Component } from '@angular/core';

@Component({
  selector: 'app-final-message',
  templateUrl: './final-message.component.html',
  styleUrls: ['./final-message.component.scss']
})
export class FinalMessageComponent {
  showMessage = false;

  revealMessage() {
    this.showMessage = true;
  }
}
