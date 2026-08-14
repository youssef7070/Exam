import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { BreadcrumbComponent } from '../../../../Shared/components/headers/breadcrumb/breadcrumb.component';
import { SecondaryHeaderComponent } from '../../../../Shared/components/headers/secondary-header/secondary-header.component';
import { AccountSliderComponent } from '../../../../Shared/components/sliders/account-slider/account-slider.component';
import { BreadcrumbItem } from '../../../../Shared/models/ibreadcrumb.interface';

@Component({
  selector: 'app-account-settings',
  imports: [
    CommonModule,
    RouterOutlet,
    BreadcrumbComponent,
    SecondaryHeaderComponent,
    AccountSliderComponent
  ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css',
})
export class AccountSettingsComponent {
  private readonly router = inject(Router);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const url = this.currentUrl();
    const items: BreadcrumbItem[] = [
      { label: 'Dashboard', link: ['/dashboard'] },
      { label: 'Account Settings', link: ['/dashboard/settings/profile'] },
    ];

    if (url.includes('change-password')) {
      items.push({ label: 'Change Password' });
    } else {
      items.push({ label: 'Profile' });
    }

    return items;
  });
}