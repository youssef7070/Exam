import { LowerCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-name',
  imports: [LowerCasePipe],
  templateUrl: './user-name.html',
  styleUrl: './user-name.css',
})
export class userName {


  @Input() label = '';
  @Input() placeholder = '';
  @Input() hasError = false;
  @Input() value = '';
  @Input() required = false;


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
