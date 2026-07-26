import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-error-message',
  imports: [],
  templateUrl: './input-error-message.html',
  styleUrl: './input-error-message.css',
})
export class InputErrorMessage {
  @Input() message = '';
  @Input() fieldLabel = '';
  @Input() showIcon = false;

  get displayMessage(): string {
    if (this.message.trim()) {
      return this.message;
    }
    if (this.fieldLabel.trim()) {
      return `Your ${this.fieldLabel.toLowerCase()} is required`;
    }
    return '';
  }
}
