import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from "../../../../Shared/components/headers/breadcrumb/breadcrumb.component";
import { HeaderComponent } from "../../../../Shared/components/headers/header/header.component";
import { DiplomasService } from '../../services/diplomas.service';
import { Daum } from '../../models/idiplomas.interface';
import { BreadcrumbItem } from '../../../../Shared/models/ibreadcrumb.interface';

@Component({
  selector: 'app-diplomas',
  standalone: true,
  imports: [BreadcrumbComponent, HeaderComponent],
  templateUrl: './diplomas.component.html',
  styleUrl: './diplomas.component.css',
})
export class DiplomasComponent {
  private readonly diplomasService = inject(DiplomasService);
  private readonly router = inject(Router);

  readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Dashboard', link: ['/dashboard'] },
    { label: 'Diplomas' },
  ];

  // Reactive State Signals
  readonly diplomas = signal<Daum[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.fetchDiplomas();
  }

  public fetchDiplomas(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.diplomasService.getDiplomas().subscribe({
      next: (res) => {
        this.diplomas.set(res.payload.data);
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message || 'Failed to load diplomas.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * When a diploma is clicked, the user navigates to the exams page and the ID is passed along
   */
  public navigateToExams(diplomaId: string): void {
    this.router.navigate(['/dashboard/exams'], { queryParams: { diplomaId } });
  }
}