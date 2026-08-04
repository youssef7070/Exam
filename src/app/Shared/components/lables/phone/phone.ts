import { UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, ElementRef, HostListener } from '@angular/core';
import { InputErrorMessage } from '../../feedback/input-error-message/input-error-message';

@Component({
  selector: 'app-phone',
  imports: [UpperCasePipe, InputErrorMessage],
  templateUrl: './phone.html',
  styleUrl: './phone.css',
})
export class Phone {

  @Input() label: string = 'Phone';
  @Input() placeholder: string = '1012345678';
  @Input() value: string = '';
  @Input() hasError: boolean = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();
  @Output() countryChange = new EventEmitter<any>();

  isDropdownOpen = false;

  countries: any[] = [
    { name: 'Egypt', code: 'eg', dialCode: '+20' },
    { name: 'Saudi Arabia', code: 'sa', dialCode: '+966' },
    { name: 'United Arab Emirates', code: 'ae', dialCode: '+971' },
    { name: 'Kuwait', code: 'kw', dialCode: '+965' },
    { name: 'Qatar', code: 'qa', dialCode: '+974' },
    { name: 'Jordan', code: 'jo', dialCode: '+962' },
  ];

  selectedCountry: any = this.countries[0];

  constructor(private ElementRef: ElementRef) { }

  // Close the dropdown when clicking anywhere outside the component
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.ElementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCountry(country: any): void {
    this.selectedCountry = country;
    this.isDropdownOpen = false;
    this.countryChange.emit(this.selectedCountry);
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.valueChange.emit(this.value);
  }

  onBlur(): void {
    this.blurred.emit();
  };

}

