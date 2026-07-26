import { Component, inject, OnInit } from '@angular/core';
import { Password } from "../../../../../Shared/components/lables/password/password";
import { PrimaryButton } from "../../../../../Shared/components/inputs/primary-button/primary-button";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-creata-new-password',
  imports: [Password, PrimaryButton, RouterLink],
  templateUrl: './creata-new-password.html',
  styleUrl: './creata-new-password.css',
})
export class CreataNewPassword implements OnInit {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  password = '';
  confirmPassword = '';
  token = '';

  passwordError = false;
  confirmPasswordError = false;

  passwordErrorMessage = '';
  confirmPasswordErrorMessage = '';

  showGeneralError = false;
  errorMessage = '';
  isLoading = false;

  ngOnInit() {
    // قراءة الـ Token الممرر في الرابط القادم من الإيميل
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || params['Token'] || '';
      console.log('Token received from URL:', this.token);
    });
  }

  onPasswordBlur() {
    if (this.password.trim() === '') {
      this.passwordError = true;
      this.passwordErrorMessage = 'New Password is required';
    } else if (this.password.length < 8) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password must be at least 8 characters';
    } else {
      this.passwordError = false;
      this.passwordErrorMessage = '';
    }
  }

  onConfirmPasswordBlur() {
    if (this.confirmPassword.trim() === '') {
      this.confirmPasswordError = true;
      this.confirmPasswordErrorMessage = 'Confirming your new password is required';
    } else if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = true;
      this.confirmPasswordErrorMessage = 'Passwords do not match';
    } else {
      this.confirmPasswordError = false;
      this.confirmPasswordErrorMessage = '';
    }
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

    this.onPasswordBlur();
    this.onConfirmPasswordBlur();

    if (!this.passwordError && !this.confirmPasswordError && this.password !== '') {
      this.isLoading = true;
      this.showGeneralError = false;
      this.errorMessage = '';

      this.authService.ResetPassword({
        token: this.token,
        newPassword: this.password,
        confirmPassword: this.confirmPassword
      }).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.showGeneralError = true;
          this.errorMessage = this.extractErrorMessage(err);
          console.error('Error resetting password', err);
        }
      });
    }
  }

}
