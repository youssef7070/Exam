import { Component, Input, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-secondary-header',
  imports: [],
  templateUrl: './secondary-header.component.html',
  styleUrl: './secondary-header.component.css',
})
export class SecondaryHeaderComponent {

  // if font put title it will put dashboard
  @Input() title: string = 'Dashboard';

  // to go back
  private readonly location = inject(Location);

  // the previous location
  goBack(): void {
    this.location.back();
  }

}