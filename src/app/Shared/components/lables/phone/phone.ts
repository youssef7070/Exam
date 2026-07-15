import { LowerCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-phone',
  imports: [LowerCasePipe],
  templateUrl: './phone.html',
  styleUrl: './phone.css',
})
export class Phone {

  @Input() label: string = 'Phone';
  @Input() placeholder: string = '1012345678';
  @Input() value: string = '';
  @Input() hasError: boolean = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<void>();

  isDropdownOpen = false;

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.valueChange.emit(this.value);
  }

  onBlur(): void {
    this.blur.emit();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }




}
