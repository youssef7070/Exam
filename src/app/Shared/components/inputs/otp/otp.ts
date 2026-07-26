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
  @Output() onEnter = new EventEmitter<void>(); // 🟢 إرسال حدث عند ضغط Enter

  otpValues: string[] = [];
  activeIndex: number = 0;

  @ViewChildren('otpBox') otpElements!: QueryList<ElementRef>;

  ngOnInit() {
    this.otpValues = new Array(this.length).fill('');
  }

  // 🟢 استلام ضغطة Enter وإرسال الحدث
  onEnterPressed(event: Event) {
    event.preventDefault(); // منع السلوك الافتراضي الذي قد يسبب مشاكل
    this.onEnter.emit();
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
    this.onCodeCompleted.emit(fullCode.length === this.length ? fullCode : '');
  }

  getCurrentCode(): string {
    return this.otpValues.join('');
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const digits = (event.clipboardData?.getData('text') ?? '')
      .replace(/\D/g, '')
      .slice(0, this.length);

    if (!digits) {
      return;
    }

    this.otpValues = new Array(this.length).fill('');
    digits.split('').forEach((digit, index) => {
      this.otpValues[index] = digit;
    });

    this.otpElements?.forEach((element, index) => {
      element.nativeElement.value = this.otpValues[index] || '';
    });

    this.activeIndex = Math.min(digits.length, this.length - 1);
    this.checkAndEmit();
  }
}