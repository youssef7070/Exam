import { Component, inject, OnInit, OnDestroy, ViewChild, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpStatusService } from '../../../../Core/services/http-status.service';
import { userName } from '../../../../Shared/components/lables/userName/user-name';
import { Email } from '../../../../Shared/components/lables/email/email';
import { Phone } from '../../../../Shared/components/lables/phone/phone';
import { PrimaryButton } from '../../../../Shared/components/inputs/primary-button/primary-button';
import { SecondaryButton } from '../../../../Shared/components/inputs/secondary-button/secondary-button';
import { Otp } from '../../../../Shared/components/inputs/otp/otp';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, userName, Email, Phone, SecondaryButton, Otp],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly usersService = inject(UsersService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly httpStatus = inject(HttpStatusService);

  private readonly _subscriptions = new Subscription();

  @ViewChild('saveOtpInput') saveOtpComponent?: Otp;

  // --- Profile Form Signals ---
  usernameValue = signal<string>('');
  emailValue = signal<string>('');
  phoneValue = signal<string>('');
  firstNameValue = signal<string>('');
  lastNameValue = signal<string>('');

  // --- Modals Control Signals ---
  showSaveModal = signal<boolean>(false);
  showDeleteModal = signal<boolean>(false);
  saveModalStep = signal<number>(1);

  // --- Modal Form State Signals ---
  modalEmail = signal<string>('');
  modalEmailError = signal<boolean>(false);
  otpCode = signal<string>('');
  otpError = signal<boolean>(false);

  // --- Global Component State Signals ---
  isLoading = signal<boolean>(false);
  showGeneralError = signal<boolean>(false);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadProfile();
  }

  private applyUserData(userData: any): void {
    this.usernameValue.set(userData?.username ?? '');
    this.emailValue.set(userData?.email ?? '');
    this.phoneValue.set(userData?.phone ?? '');
    this.firstNameValue.set(userData?.firstName ?? '');
    this.lastNameValue.set(userData?.lastName ?? '');
    this.modalEmail.set(this.emailValue().trim());
  }

  loadProfile(): void {
    this.isLoading.set(true);
    this.showGeneralError.set(false);
    this.errorMessage.set('');

    this.usersService.getUserProfile().subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        const userData = res?.user ?? res?.payload?.user ?? res?.payload ?? res;
        this.applyUserData(userData);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.showGeneralError.set(true);
        this.errorMessage.set(this.extractErrorMessage(err));
      },
    });
  }

  onSaveChanges(event: Event): void {
    event.preventDefault();
    this.resetSaveModalState();
    this.modalEmail.set(this.emailValue().trim());
    this.showSaveModal.set(true);
  }

  openDeleteModal(): void {
    this.showDeleteModal.set(true);
  }

  closeSaveModal(): void {
    this.showSaveModal.set(false);
    this.resetSaveModalState();
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
  }

  goToSaveStep(step: number): void {
    this.saveModalStep.set(step);
    this.showGeneralError.set(false);
    this.errorMessage.set('');
    this.otpError.set(false);
  }

  onModalEmailBlur(): void {
    const val = this.modalEmail();
    this.modalEmailError.set(!val.includes('@') || val.trim() === '');
  }

  requestEmailVerification(event?: Event): void {
    if (event) event.preventDefault();
    if (this.isLoading()) return;

    this.onModalEmailBlur();
    if (this.modalEmailError() || !this.modalEmail().trim()) {
      this.showGeneralError.set(true);
      this.errorMessage.set('Please enter a valid email address.');
      return;
    }

    this.showGeneralError.set(false);
    this.errorMessage.set('');
    this.isLoading.set(true);

    const newEmail = this.modalEmail().trim();

    this.usersService.requestEmailChange({ newEmail }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.goToSaveStep(2);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.showGeneralError.set(true);
        this.errorMessage.set(this.extractErrorMessage(err));
      },
    });
  }

  onOtpChange(code: string): void {
    this.otpCode.set(code);
    if (code && code.length === 6) {
      this.otpError.set(false);
      this.showGeneralError.set(false);
      this.errorMessage.set('');
    }
  }

  confirmEmailAndSave(event?: Event): void {
    if (event) event.preventDefault();
    if (this.isLoading()) return;

    const code = this.saveOtpComponent?.getCurrentCode?.() || this.otpCode();

    if (!code || code.trim().length < 6) {
      this.otpError.set(true);
      this.errorMessage.set('Please enter the full 6-digit verification code.');
      return;
    }

    this.otpError.set(false);
    this.showGeneralError.set(false);
    this.errorMessage.set('');
    this.isLoading.set(true);

    this.usersService.confirmEmailChange({ code: code.trim() }).subscribe({
      next: () => {
        const profilePayload = {
          firstName: this.firstNameValue().trim(),
          lastName: this.lastNameValue().trim(),
          phone: this.phoneValue().trim(),
        };

        this.usersService.updateUserProfile(profilePayload).subscribe({
          next: () => {
            this.isLoading.set(false);
            this.emailValue.set(this.modalEmail().trim());
            this.closeSaveModal();
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading.set(false);
            this.showGeneralError.set(true);
            this.errorMessage.set(this.extractErrorMessage(err));
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.otpError.set(true);
        this.errorMessage.set(this.extractErrorMessage(err));
      },
    });
  }

  deleteAccount(): void {
    if (this.httpStatus.isLoading()) return;

    // Loading & error are handled globally by the httpStatusInterceptor
    const sub = this.usersService.deleteAccount().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.closeDeleteModal();
        this.router.navigate(['/login']);
      },
      error: () => {
        // Error is handled globally by the httpStatusInterceptor
        this.closeDeleteModal();
      },
    });

    this._subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private resetSaveModalState(): void {
    this.saveModalStep.set(1);
    this.modalEmail.set('');
    this.modalEmailError.set(false);
    this.otpCode.set('');
    this.otpError.set(false);
    this.isLoading.set(false);
    this.showGeneralError.set(false);
    this.errorMessage.set('');
  }

  private extractErrorMessage(err: unknown): string {
    const error = err as { error?: string | { message?: string; Error?: string; err?: string }; message?: string };
    if (typeof error?.error === 'string') return error.error;
    return (
      error?.error?.message ||
      error?.error?.Error ||
      error?.error?.err ||
      error?.message ||
      'An unexpected error occurred. Please try again.'
    );
  }
}
