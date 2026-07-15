import { Component } from '@angular/core';
import { Password } from "../../../../../Shared/components/lables/password/password";
import { PrimaryButton } from "../../../../../Shared/components/inputs/primary-button/primary-button";
import { FixedSide } from "../../fixed-side/fixed-side";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-creata-new-password',
  imports: [Password, PrimaryButton, FixedSide, RouterLink],
  templateUrl: './creata-new-password.html',
  styleUrl: './creata-new-password.css',
})
export class CreataNewPassword {


  password = '';
  confirmPassword = '';

  passwordError = false;
  confirmPasswordError = false;

  passwordErrorMessage = '';
  confirmPasswordErrorMessage = '';


  onPasswordBlur() {
    if (this.password.trim() === '') {
      this.passwordError = true;
      this.passwordErrorMessage = 'New Password is required';
    } else if (this.password.length < 8) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password must be at least 8 characters';
    } else {
      this.passwordError = false;
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
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    // Trigger both input validations
    this.onPasswordBlur();
    this.onConfirmPasswordBlur();

    if (!this.passwordError && !this.confirmPasswordError) {
      console.log('Password has been successfully updated.');

      // Navigate user back to login page
    }
  }



}
