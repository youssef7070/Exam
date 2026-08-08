import { Component, inject, signal } from '@angular/core';
import { Password } from '../../../../Shared/components/lables/password/password';
import { PrimaryButton } from '../../../../Shared/components/inputs/primary-button/primary-button';
import { UsersService } from '../../services/users.service';
import { HttpStatusService } from '../../../../Core/services/http-status.service';

@Component({
  selector: 'app-change-password',
  imports: [Password, PrimaryButton],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly usersService = inject(UsersService);
  private readonly httpStatus = inject(HttpStatusService);

  currentPasswordValue = signal('');
  newPasswordValue = signal('');
  confirmPasswordValue = signal('');

  currentPasswordError = signal(false);
  newPasswordError = signal(false);
  confirmPasswordError = signal(false);
  currentPasswordTouched = signal(false);
  newPasswordTouched = signal(false);
  confirmPasswordTouched = signal(false);
  readonly isLoading = this.httpStatus.isLoading;
  successMessage = signal('');
  validationMessage = signal('');

  onCurrentPasswordValueChange(value: string): void {
    this.currentPasswordValue.set(value);
    if (this.currentPasswordTouched()) {
      this.evaluateCurrentPasswordError();
    }
  }

  onNewPasswordValueChange(value: string): void {
    this.newPasswordValue.set(value);
    if (this.newPasswordTouched()) {
      this.evaluateNewPasswordError();
    }
    if (this.confirmPasswordTouched()) {
      this.evaluateConfirmPasswordError();
    }
  }

  onConfirmPasswordValueChange(value: string): void {
    this.confirmPasswordValue.set(value);
    if (this.confirmPasswordTouched()) {
      this.evaluateConfirmPasswordError();
    }
  }

  onCurrentPasswordBlur(): void {
    this.currentPasswordTouched.set(true);
    this.evaluateCurrentPasswordError();
  }

  onNewPasswordBlur(): void {
    this.newPasswordTouched.set(true);
    this.evaluateNewPasswordError();
    if (this.confirmPasswordTouched()) {
      this.evaluateConfirmPasswordError();
    }
  }

  onConfirmPasswordBlur(): void {
    this.confirmPasswordTouched.set(true);
    this.evaluateConfirmPasswordError();
  }

  private isCurrentPasswordInvalid(): boolean {
    return !this.currentPasswordValue().trim();
  }

  private isNewPasswordInvalid(): boolean {
    return this.newPasswordValue().trim().length < 8;
  }

  private doPasswordsMismatch(): boolean {
    return this.confirmPasswordValue().trim() !== this.newPasswordValue().trim();
  }

  private evaluateCurrentPasswordError(force = false): void {
    this.currentPasswordError.set((force || this.currentPasswordTouched()) && this.isCurrentPasswordInvalid());
  }

  private evaluateNewPasswordError(force = false): void {
    this.newPasswordError.set((force || this.newPasswordTouched()) && this.isNewPasswordInvalid());
  }

  private evaluateConfirmPasswordError(force = false): void {
    this.confirmPasswordError.set((force || this.confirmPasswordTouched()) && this.doPasswordsMismatch());
  }

  private validatePasswords(force = false): void {
    this.evaluateCurrentPasswordError(force);
    this.evaluateNewPasswordError(force);
    this.evaluateConfirmPasswordError(force);
  }

  updatePassword(event?: Event): void {
    if (event) event.preventDefault();
    if (this.isLoading()) return;

    this.validatePasswords(true);

    if (this.currentPasswordError() || this.newPasswordError() || this.confirmPasswordError()) {
      this.successMessage.set('');
      this.validationMessage.set(this.newPasswordError()
        ? 'New password must be at least 8 characters.'
        : this.confirmPasswordError()
          ? 'Passwords do not match.'
          : 'Please complete all fields correctly.');
      return;
    }

    this.validationMessage.set('');
    this.successMessage.set('');

    this.usersService.changePassword({
      oldPassword: this.currentPasswordValue().trim(),
      newPassword: this.newPasswordValue().trim(),
    }).subscribe({
      next: () => {
        this.successMessage.set('Password updated successfully.');
        this.currentPasswordTouched.set(false);
        this.newPasswordTouched.set(false);
        this.confirmPasswordTouched.set(false);
        this.currentPasswordValue.set('');
        this.newPasswordValue.set('');
        this.confirmPasswordValue.set('');
      },
      error: (err) => {
        this.successMessage.set('');
        this.validationMessage.set(this.extractErrorMessage(err));
      },
    });
  }

  private extractErrorMessage(err: any): string {
    if (typeof err?.error === 'string') return err.error;
    return (
      err?.error?.message ||
      err?.error?.Error ||
      err?.error?.err ||
      err?.message ||
      'An unexpected error occurred. Please try again.'
    );
  }
}