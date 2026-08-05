import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Password } from '../../../../Shared/components/lables/password/password';
import { PrimaryButton } from '../../../../Shared/components/inputs/primary-button/primary-button';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-change-password',
  imports: [Password, PrimaryButton],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly usersService = inject(UsersService);

  currentPasswordValue = signal('');
  newPasswordValue = signal('');
  confirmPasswordValue = signal('');

  currentPasswordError = signal(false);
  newPasswordError = signal(false);
  confirmPasswordError = signal(false);
  currentPasswordTouched = signal(false);
  newPasswordTouched = signal(false);
  confirmPasswordTouched = signal(false);
  isLoading = signal(false);
  showGeneralError = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  onCurrentPasswordValueChange(value: string): void {
    this.currentPasswordValue.set(value);
    if (this.currentPasswordTouched()) {
      this.currentPasswordError.set(!value.trim());
    }
  }

  onNewPasswordValueChange(value: string): void {
    this.newPasswordValue.set(value);
    if (this.newPasswordTouched()) {
      this.newPasswordError.set(value.trim().length < 8);
    }
    if (this.confirmPasswordTouched()) {
      this.confirmPasswordError.set(this.confirmPasswordValue().trim() !== value.trim());
    }
  }

  onConfirmPasswordValueChange(value: string): void {
    this.confirmPasswordValue.set(value);
    if (this.confirmPasswordTouched()) {
      this.confirmPasswordError.set(value.trim() !== this.newPasswordValue().trim());
    }
  }

  onCurrentPasswordBlur(): void {
    this.currentPasswordTouched.set(true);
    this.currentPasswordError.set(!this.currentPasswordValue().trim());
  }

  onNewPasswordBlur(): void {
    this.newPasswordTouched.set(true);
    this.newPasswordError.set(this.newPasswordValue().trim().length < 8);
    if (this.confirmPasswordTouched()) {
      this.confirmPasswordError.set(this.confirmPasswordValue().trim() !== this.newPasswordValue().trim());
    }
  }

  onConfirmPasswordBlur(): void {
    this.confirmPasswordTouched.set(true);
    this.confirmPasswordError.set(this.confirmPasswordValue().trim() !== this.newPasswordValue().trim());
  }

  private validatePasswords(force = false): void {
    this.currentPasswordError.set((force || this.currentPasswordTouched()) && !this.currentPasswordValue().trim());
    this.newPasswordError.set((force || this.newPasswordTouched()) && this.newPasswordValue().trim().length < 8);
    this.confirmPasswordError.set((force || this.confirmPasswordTouched()) && this.confirmPasswordValue().trim() !== this.newPasswordValue().trim());
  }

  updatePassword(event?: Event): void {
    if (event) event.preventDefault();
    if (this.isLoading()) return;

    this.validatePasswords(true);

    if (this.currentPasswordError() || this.newPasswordError() || this.confirmPasswordError()) {
      this.showGeneralError.set(true);
      this.successMessage.set('');
      this.errorMessage.set(this.newPasswordError()
        ? 'New password must be at least 8 characters.'
        : this.confirmPasswordError()
          ? 'Passwords do not match.'
          : 'Please complete all fields correctly.');
      return;
    }

    this.showGeneralError.set(false);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.isLoading.set(true);

    this.usersService.changePassword({
      oldPassword: this.currentPasswordValue().trim(),
      newPassword: this.newPasswordValue().trim(),
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Password updated successfully.');
        this.currentPasswordTouched.set(false);
        this.newPasswordTouched.set(false);
        this.confirmPasswordTouched.set(false);
        this.currentPasswordValue.set('');
        this.newPasswordValue.set('');
        this.confirmPasswordValue.set('');
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.showGeneralError.set(true);
        this.errorMessage.set(this.extractErrorMessage(err));
      },
    });
  }

  private extractErrorMessage(err: unknown): string {
    const error = err as { error?: string | { message?: string; Error?: string; err?: string }; message?: string };
    if (typeof error?.error === 'string') return error.error;
    return (
      error?.error?.message ||
      error?.error?.Error ||
      error?.error?.err ||
      error?.message ||
      'Unable to update password. Please try again.'
    );
  }
}