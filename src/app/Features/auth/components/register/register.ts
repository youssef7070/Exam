import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FixedSide } from "../fixed-side/fixed-side";
import { Email } from "../../../../Shared/components/lables/email/email";
import { SecondaryButton } from "../../../../Shared/components/inputs/secondary-button/secondary-button";
import { Otp } from "../../../../Shared/components/inputs/otp/otp";
import { userName } from "../../../../Shared/components/lables/userName/user-name";
import { Phone } from "../../../../Shared/components/lables/phone/phone";
import { Password } from "../../../../Shared/components/lables/password/password";
import { PrimaryButton } from "../../../../Shared/components/inputs/primary-button/primary-button";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-register',
  imports: [FixedSide, Email, SecondaryButton, Otp, userName, Phone, Password, PrimaryButton, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  ngOnInit(): void {
    initFlowbite();
  }



  currentStep: number = 1;

  email: string = '';
  emailError: boolean = false;

  otpCode: string = '';

  firstName: string = '';
  firstNameError: boolean = false;
  lastName: string = '';
  lastNameError: boolean = false;
  username: string = '';
  usernameError: boolean = false;
  phoneNumber: string = '';
  phoneError: boolean = false;

  password: string = '';
  passwordError: boolean = false;
  passwordErrorMessage: string = '';
  confirmPassword: string = '';
  confirmPasswordError: boolean = false;
  confirmPasswordErrorMessage: string = '';

  goToStep(step: number): void {
    this.currentStep = step;
  }

  onEmailBlur() {
    this.emailError = !this.email.includes('@');
  }

  onOtpChange(code: string) {
    this.otpCode = code;
  }

  onVerifySubmit() {
    this.goToStep(3);
  }

  onFirstNameBlur() { this.firstNameError = this.firstName.trim() === ''; }
  onLastNameBlur() { this.lastNameError = this.lastName.trim() === ''; }
  onUsernameBlur() { this.usernameError = this.username.trim() === ''; }
  onPhoneBlur() { this.phoneError = this.phoneNumber.trim() === ''; }

  onPasswordBlur() {
    this.passwordError = this.password.length < 8;
    this.passwordErrorMessage = this.passwordError ? 'Password must be at least 8 characters' : '';
  }

  onConfirmPasswordBlur() {
    this.confirmPasswordError = this.password !== this.confirmPassword;
    this.confirmPasswordErrorMessage = this.confirmPasswordError ? 'Passwords do not match' : '';
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.passwordError && !this.confirmPasswordError) {
      console.log('Registration Complete!', {
        email: this.email,
        name: `${this.firstName} ${this.lastName}`,
        username: this.username,
        phone: this.phoneNumber
      });

    }
  }


}
