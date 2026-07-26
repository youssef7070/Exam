import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-message-reset-password',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './forget-message-reset-password.html',
  styleUrl: './forget-message-reset-password.css',
})
export class ForgetMessageResetPassword implements OnInit {

  userEmail: string = '';

  ngOnInit() {
    if (typeof window !== 'undefined' && window.history && window.history.state) {
      const state = window.history.state;
      if (state && state.email) {
        this.userEmail = state.email;
        return;
      }
    }
    this.userEmail = 'user@example.com';
  }

}