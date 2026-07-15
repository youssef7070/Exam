import { LowerCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-password',
  imports: [LowerCasePipe, FontAwesomeModule],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export class Password {



  // openEye = EYE

  @Input() label = '';
  @Input() placeholder = '';
  @Input() hasError = false;
  @Input() value = '';
  @Input() errorMessage: string = '';
  @Input() required = false;


  @Output() valueChange = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();

  isPasswordHidden = true;

  togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  onBlur(): void {
    this.blurred.emit();
  }


}
