import { Component } from '@angular/core';
import { FixedSide } from "../../fixed-side/fixed-side";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-message-reset-password',
  imports: [FixedSide, RouterLink],
  templateUrl: './forget-message-reset-password.html',
  styleUrl: './forget-message-reset-password.css',
})
export class ForgetMessageResetPassword { }
