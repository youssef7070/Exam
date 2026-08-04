import { Component, inject } from '@angular/core';
import { userName } from "../../../../Shared/components/lables/userName/user-name";
import { Password } from "../../../../Shared/components/lables/password/password";
import { PrimaryButton } from "../../../../Shared/components/inputs/primary-button/primary-button";
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Iauth } from '../../models/iauth.interface';

@Component({
  selector: 'app-login',
  imports: [userName, Password, PrimaryButton, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  username = '';
  password = '';

  usernameTouched = false;
  passwordTouched = false;

  showGeneralError = false;
  errorMessage = '';
  isLoading = false;

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

  private extractErrorMessage(err: any): string {
    if (typeof err?.error === 'string') return err.error;
    return err?.error?.message ||
      err?.error?.Error ||
      err?.error?.err ||
      err?.message ||
      'Invalid username or password.';
  }

  onSubmit(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.usernameTouched = true;
    this.passwordTouched = true;

    if (this.usernameError || this.passwordError) {
      this.showGeneralError = true;
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    this.showGeneralError = false;
    this.errorMessage = '';
    this.isLoading = true;

    this._authService.Login({ username: this.username, password: this.password }).subscribe({
      next: (res: Iauth) => {
        this.isLoading = false;

        const token = res?.payload?.token;

        if (res?.status && token) {
          this._authService.setToken(token);
          this._router.navigate(['/home']);
        } else {
          this.showGeneralError = true;
          this.errorMessage = res?.message || 'Invalid username or password.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.showGeneralError = true;
        this.errorMessage = this.extractErrorMessage(err);
        console.error('Login Error:', err);
      }
    });
  }
}