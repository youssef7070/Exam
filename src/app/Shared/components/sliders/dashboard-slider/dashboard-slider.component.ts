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

  // service
  private readonly usersService = inject(UsersService);

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  // signal variable
  emailValue = signal<string>('');
  firstNameValue = signal<string>('');


  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {

    this.profileData();

    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
  }


  // appear user data
  private applyUserData(res: any | null): void {
    //  if it is null or undefined
    if (!res) {
      this.firstNameValue.set('');
      this.emailValue.set('');
      return;
    }

    // search for data by safety way
    const user = res.user ?? res.payload?.user ?? res.payload ?? res.data ?? res;

    const firstName = user?.firstName ?? user?.FirstName ?? '';
    const email = user?.email ?? user?.Email ?? '';

    // set data in signal variable
    this.firstNameValue.set(firstName);
    this.emailValue.set(email);
  }

  // get user data
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