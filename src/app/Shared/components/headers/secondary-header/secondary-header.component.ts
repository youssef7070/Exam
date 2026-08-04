import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secondary-header',
  imports: [],
  templateUrl: './secondary-header.component.html',
  styleUrl: './secondary-header.component.css',
})
export class SecondaryHeaderComponent {
  @Input() title: string = 'Dashboard';
}
