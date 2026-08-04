import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FixedSide } from '../../components/fixed-side/fixed-side';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, FixedSide],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
