import { LowerCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-email',
  imports: [LowerCasePipe],
  templateUrl: './email.html',
  styleUrl: './email.css',
})
export class Email {


  @Input() label = '';
  @Input() placeholder = '';
  @Input() hasError = false;
  @Input() value = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  onBlur(): void {
    this.blurred.emit();
  }


}
