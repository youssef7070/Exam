import { Component } from '@angular/core';
import { FixedSide } from "../../fixed-side/fixed-side";
import { Email } from "../../../../../Shared/components/lables/email/email";
import { PrimaryButton } from "../../../../../Shared/components/inputs/primary-button/primary-button";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-step-email',
  imports: [FixedSide, Email, PrimaryButton, RouterLink],
  templateUrl: './forget-step-email.html',
  styleUrl: './forget-step-email.css',
})
export class ForgetStepEmail {

  email: string = '';
  emailError: boolean = false;


  // Validates email on input blur
  onEmailBlur() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (this.email.trim() === '' || !emailPattern.test(this.email)) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }

  // Handles form submission
  onSubmit(event: Event) {
    event.preventDefault();

    // Trigger validation
    this.onEmailBlur();

    if (!this.emailError && this.email.trim() !== '') {
      console.log('Sending recovery email to:', this.email);

    }
  }


}
