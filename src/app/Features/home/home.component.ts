import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { DashboardSliderComponent } from "../../Shared/components/sliders/dashboard-slider/dashboard-slider.component";
import { DiplomasComponent } from "../Dashboard/components/diplomas/diplomas.component";

@Component({
  selector: 'app-home',
  // imports: [DashboardSliderComponent, DiplomasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  // private readonly router = inject(Router);
  // private readonly authService = inject(AuthService);

  // logout(): void {
  //   this.authService.clearToken();
  //   this.router.navigate(['/login']);
  // }

}
