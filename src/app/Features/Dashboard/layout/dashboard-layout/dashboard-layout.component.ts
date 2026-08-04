import { Component } from '@angular/core';
import { DashboardSliderComponent } from "../../../../Shared/components/sliders/dashboard-slider/dashboard-slider.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [DashboardSliderComponent, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent { }
