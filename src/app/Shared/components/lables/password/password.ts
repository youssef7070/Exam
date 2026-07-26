import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputErrorMessage } from '../../feedback/input-error-message/input-error-message';


@Component({
  selector: 'app-password',
  imports: [FontAwesomeModule, InputErrorMessage],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export class Password {


  // @Inputs
  @Input() label = '';
  @Input() placeholder = '';
  @Input() hasError = false;
  @Input() value = '';
  @Input() errorMessage: string = '';
  @Input() required = false;


  //  Outputs
  @Output() valueChange = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();

  isPasswordHidden = true;

  // eye 
  togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  // chnage value
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  // touched
  onBlur(): void {
    this.blurred.emit();
  }


}
