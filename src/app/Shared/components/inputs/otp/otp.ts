import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-otp',
  imports: [],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class Otp {


  @Input() length: number = 6;
  @Output() onCodeCompleted = new EventEmitter<string>();

  otpValues: string[] = [];
  activeIndex: number = 0;

  @ViewChildren('otpBox') otpElements!: QueryList<ElementRef>;

  ngOnInit() {
    this.otpValues = new Array(this.length).fill('');
  }

  onInputChange(input: HTMLInputElement, index: number) {
    const val = input.value.replace(/[^0-9]/g, '');
    this.otpValues[index] = val;
    input.value = val;

    if (val && index < this.length - 1) {
      this.activeIndex = index + 1;
      setTimeout(() => {
        this.otpElements.toArray()[index + 1].nativeElement.focus();
      });
    }

    this.checkAndEmit();
  }

  onBackspace(input: HTMLInputElement, index: number) {
    if (!input.value && index > 0) {
      this.activeIndex = index - 1;
      this.otpValues[index - 1] = '';
      setTimeout(() => {
        const prevInput = this.otpElements.toArray()[index - 1].nativeElement;
        prevInput.focus();
      });
    }
    this.checkAndEmit();
  }

  private checkAndEmit() {
    const fullCode = this.otpValues.join('');
    if (fullCode.length === this.length) {
      this.onCodeCompleted.emit(fullCode);
    } else {
      this.onCodeCompleted.emit('');
    }
  }


}
