import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../../../Features/Dashboard/services/users.service';
import { FlowbiteService } from '../../../../flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../Features/auth/services/auth.service';


@Component({
  selector: 'app-dashboard-slider',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-slider.component.html',
  styleUrls: ['./dashboard-slider.component.css'],
})
export class DashboardSliderComponent implements OnInit {

  private readonly usersService = inject(UsersService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);



  emailValue = signal<string>('');
  firstNameValue = signal<string>('');

  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.profileData();
    };

    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
  }

  private applyUserData(res: any | null): void {
    if (!res) {
      this.firstNameValue.set('');
      this.emailValue.set('');
      return;
    }

    const user = res.user ?? res.payload?.user ?? res.payload ?? res.data ?? res;

    const firstName = user?.firstName ?? user?.FirstName ?? '';
    const email = user?.email ?? user?.Email ?? '';

    this.firstNameValue.set(firstName);
    this.emailValue.set(email);
  }

  profileData(): void {
    this.usersService.getUserProfile().subscribe({
      next: (data) => {
        console.log('Data returned successfully:', data);
        this.applyUserData(data);
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.applyUserData(null);
      },
    });
  }

  // modal

  isModalOpen = signal<boolean>(false);

  openModal(): void {
    this.isModalOpen.set(true);

  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  toggleModal(): void {
    this.isModalOpen.update((prev) => !prev);
  }

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

  isDiplomasActive(): boolean {
    const url = this.router.url;
    return url === '/dashboard' ||
      url.startsWith('/dashboard/diplomas') ||
      url.startsWith('/dashboard/exams') ||
      url.startsWith('/dashboard/questions') ||
      url.startsWith('/dashboard/results');
  }
}