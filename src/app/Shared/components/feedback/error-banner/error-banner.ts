import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.html',
  styleUrl: './error-banner.css',
})
export class ErrorBanner {
  @Input() message: string = 'Something went wrong. Please try again.';
  @Input() containerClass: string = 'mt-2 mb-6';
}
