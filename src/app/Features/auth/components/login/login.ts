import { Component } from '@angular/core';
import { FixedSide } from "../fixed-side/fixed-side";
import { userName } from "../../../../Shared/components/lables/userName/user-name";
import { Password } from "../../../../Shared/components/lables/password/password";
import { PrimaryButton } from "../../../../Shared/components/inputs/primary-button/primary-button";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FixedSide, userName, Password, PrimaryButton, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';

  usernameTouched = false;
  passwordTouched = false;

  showGeneralError = false;

  get usernameError(): boolean {
    return this.usernameTouched && !this.username.trim();
  }

  get passwordError(): boolean {
    return this.passwordTouched && !this.password.trim();
  }

  onUsernameBlur(): void {
    this.usernameTouched = true;
  }

  onPasswordBlur(): void {
    this.passwordTouched = true;
  }

  onSubmit(): void {
    this.usernameTouched = true;
    this.passwordTouched = true;

    if (this.usernameError || this.passwordError) {
      this.showGeneralError = true;
      return;
    }

    this.showGeneralError = false;


  }
}
