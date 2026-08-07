import { Component, inject, OnInit, signal } from '@angular/core';
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
export class DiplomasComponent implements OnInit {
  private readonly diplomasService = inject(DiplomasService);
  private readonly router = inject(Router);

  readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Dashboard', link: ['/dashboard'] },
    { label: 'Diplomas' },
  ];

  // Reactive State Signals
  readonly diplomas = signal<Daum[]>([]);

  ngOnInit(): void {
    this.fetchDiplomas();
  }

  public fetchDiplomas(): void {
    this.diplomasService.getDiplomas().subscribe({
      next: (res) => {
        this.diplomas.set(res.payload.data);
      },
      error: () => {
        // Error handling is managed globally by the HTTP interceptor.
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