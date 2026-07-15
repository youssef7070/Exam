import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-primary-button',
  imports: [RouterLink],
  templateUrl: './primary-button.html',
  styleUrl: './primary-button.css',
})
export class PrimaryButton {


  @Input() text: string = 'Submit';

  @Input() type: 'button' | 'submit' = 'button';

  @Output() onClick = new EventEmitter<MouseEvent>();

  @Input() routerLink: string | any[] | null = null;


}
