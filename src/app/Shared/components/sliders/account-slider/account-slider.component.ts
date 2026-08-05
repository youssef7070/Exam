import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-account-slider',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './account-slider.component.html',
  styleUrl: './account-slider.component.css',
})
export class AccountSliderComponent { }