import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Email } from "../../../../Shared/components/lables/email/email";
import { SecondaryButton } from "../../../../Shared/components/inputs/secondary-button/secondary-button";
import { Otp } from "../../../../Shared/components/inputs/otp/otp";
import { userName } from "../../../../Shared/components/lables/userName/user-name";
import { Phone } from "../../../../Shared/components/lables/phone/phone";
import { Password } from "../../../../Shared/components/lables/password/password";
import { PrimaryButton } from "../../../../Shared/components/inputs/primary-button/primary-button";
import { Router, RouterLink } from "@angular/router";
import { FlowbiteService } from '../../../../flowbite.service';
import { isPasswordMatching } from '../../../../Shared/utilities/validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    Email,
    SecondaryButton,
    Otp,
    userName,
    Phone,
    Password,
    PrimaryButton,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
  }

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  @ViewChild(Otp) otpComponent?: Otp;

  currentStep: number = 1;
  isLoading: boolean = false;
  showGeneralError: boolean = false;
  errorMessage: string = '';
  otpError: boolean = false;

  // Step 1
  email: string = '';
  emailError: boolean = false;

  // Step 2
  otpCode: string = '';

  // Step 3
  firstName: string = '';
  firstNameError: boolean = false;
  lastName: string = '';
  lastNameError: boolean = false;
  username: string = '';
  usernameError: boolean = false;
  phoneNumber: string = '';
  phoneError: boolean = false;

  // Step 4
  password: string = '';
  passwordError: boolean = false;
  passwordErrorMessage: string = '';
  confirmPassword: string = '';
  confirmPasswordError: boolean = false;
  confirmPasswordErrorMessage: string = '';

  goToStep(step: number): void {
    this.currentStep = step;
    this.showGeneralError = false;
    this.errorMessage = '';
  }

  // دالة متكاملة لاستخراج نص الخطأ من الـ API مهما كان شكله
  private extractErrorMessage(err: any): string {
    if (typeof err?.error === 'string') return err.error;
    return err?.error?.message ||
      err?.error?.Error ||
      err?.error?.err ||
      err?.message ||
      'An unexpected error occurred. Please try again.';
  }

  // --- Step 1: Send OTP ---
  onEmailBlur() {
    this.emailError = !this.email.includes('@') || this.email.trim() === '';
  }

  sendVerificationCode(event?: Event) {
    if (event) event.preventDefault();
    if (this.isLoading) return;

    this.onEmailBlur();
    if (this.emailError || !this.email.trim()) {
      this.showGeneralError = true;
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.showGeneralError = false;
    this.errorMessage = '';
    this.isLoading = true;

    this._authService.SendOtp({ email: this.email.trim() }).subscribe({
      next: () => {
        this.isLoading = false;
        this.goToStep(2);
      },
      error: (err) => {
        this.isLoading = false;
        this.showGeneralError = true;
        this.errorMessage = this.extractErrorMessage(err);
      }
    });
  }

  // --- Step 2: Verify OTP ---
  onOtpChange(code: string) {
    this.otpCode = code;
    if (code && code.length === 6) {
      this.otpError = false;
      this.showGeneralError = false;
      this.errorMessage = '';
    }
  }

  onVerifySubmit() {
    if (this.isLoading) return;

    const code = this.otpComponent?.getCurrentCode?.() || this.otpCode;

    if (!code || code.trim().length < 6) {
      this.otpError = true;
      this.errorMessage = 'Please enter the full 6-digit verification code.';
      return;
    }

    this.otpError = false;
    this.showGeneralError = false;
    this.errorMessage = '';
    this.isLoading = true;

    const data = {
      email: this.email.trim(),
      code: code.trim(),
    };

    this._authService.ConfirmOtp(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.otpCode = code.trim();
        this.goToStep(3);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.otpError = true;
        this.errorMessage = this.extractErrorMessage(err);
      }
    });
  }

  // --- Step 3: User Details Validation ---
  onFirstNameBlur() { this.firstNameError = this.firstName.trim() === ''; }
  onLastNameBlur() { this.lastNameError = this.lastName.trim() === ''; }
  onUsernameBlur() { this.usernameError = this.username.trim() === ''; }
  onPhoneBlur() { this.phoneError = this.phoneNumber.trim() === ''; }

  submitStep3() {
    this.onFirstNameBlur();
    this.onLastNameBlur();
    this.onUsernameBlur();
    this.onPhoneBlur();

    if (!this.firstNameError && !this.lastNameError && !this.usernameError && !this.phoneError) {
      this.goToStep(4);
    }
  }

  // --- Step 4: Password & Register ---
  onPasswordBlur() {
    this.passwordError = this.password.length < 8;
    this.passwordErrorMessage = this.passwordError ? 'Password must be at least 8 characters' : '';

    if (this.confirmPassword) {
      this.onConfirmPasswordBlur();
    }
  }

  onConfirmPasswordBlur() {
    const isMatching = isPasswordMatching(this.password, this.confirmPassword);
    this.confirmPasswordError = !isMatching;
    this.confirmPasswordErrorMessage = this.confirmPasswordError ? 'Passwords do not match' : '';
  }

  onConfirmPasswordChange(value: string): void {
    this.confirmPassword = value;
    if (this.confirmPasswordError) {
      this.onConfirmPasswordBlur();
    }
  }

  onSubmit(event?: Event) {
    if (event) event.preventDefault();
    if (this.isLoading) return;

    this.onPasswordBlur();
    this.onConfirmPasswordBlur();

    if (!this.passwordError && !this.confirmPasswordError && this.password && this.confirmPassword) {
      this.isLoading = true;
      this.showGeneralError = false;

      const registerPayload = {
        username: this.username.trim(),
        email: this.email.trim(),
        password: this.password,
        confirmPassword: this.confirmPassword,
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        phone: this.phoneNumber.trim(),
      };

      this._authService.Register(registerPayload).subscribe({
        next: () => {
          this.isLoading = false;
          this._router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.showGeneralError = true;
          this.errorMessage = this.extractErrorMessage(err);
        }
      });
    }
  }
}