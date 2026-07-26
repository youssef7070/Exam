import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Email } from "../../../../../Shared/components/lables/email/email";
import { PrimaryButton } from "../../../../../Shared/components/inputs/primary-button/primary-button";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forget-step-email',
  standalone: true,
  imports: [Email, PrimaryButton, RouterLink],
  templateUrl: './forget-step-email.html',
  styleUrl: './forget-step-email.css',
})
export class ForgetStepEmail {

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  email: string = '';
  emailError: boolean = false;
  showGeneralError: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  onEmailBlur() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailError = this.email.trim() === '' || !emailPattern.test(this.email);
  }

  private extractErrorMessage(err: any): string {
    if (typeof err?.error === 'string') return err.error;
    return err?.error?.message ||
      err?.error?.Error ||
      err?.error?.err ||
      err?.message ||
      'An unexpected error occurred. Please try again.';
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.onEmailBlur();

    if (!this.emailError && this.email.trim() !== '') {
      this.isLoading = true;
      this.showGeneralError = false;
      this.errorMessage = '';

      this.authService.ForgotPassword(this.email).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/message-reset-password'], {
            state: { email: this.email }
          });
        },
        error: (err) => {
          this.isLoading = false;
          this.showGeneralError = true;
          this.errorMessage = this.extractErrorMessage(err);
          console.error('Error sending reset email:', err);
        }
      });
    }
  }


}