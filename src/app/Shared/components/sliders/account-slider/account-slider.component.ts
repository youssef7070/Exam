import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../../Features/auth/services/auth.service';

@Component({
  selector: 'app-account-slider',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './account-slider.component.html',
  styleUrl: './account-slider.component.css',
})
export class AccountSliderComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

}