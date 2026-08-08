import { Component, Input, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-secondary-header',
  imports: [],
  templateUrl: './secondary-header.component.html',
  styleUrl: './secondary-header.component.css',
})
export class SecondaryHeaderComponent {
  @Input() title: string = 'Dashboard';
  private readonly location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}