import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputErrorMessage } from '../../feedback/input-error-message/input-error-message';

@Component({
  selector: 'app-user-name',
  imports: [InputErrorMessage],
  templateUrl: './user-name.html',
  styleUrl: './user-name.css',
})
export class userName {


  // @Inputs
  @Input() label = '';
  @Input() placeholder = '';
  @Input() hasError = false;
  @Input() value = '';
  @Input() required = false;

  // @Outputs
  @Output() valueChange = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();

  // change value
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  // touched
  onBlur(): void {
    this.blurred.emit();
  }


}
