import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbItem } from '../../../models/ibreadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  @Input() paths: string[] = [];

  get displayItems(): BreadcrumbItem[] {
    if (this.items.length) {
      return this.items;
    }

    return this.paths.map((label) => ({ label }));
  }
}
