import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbComponent } from "../../../../Shared/components/headers/breadcrumb/breadcrumb.component";
import { SecondaryHeaderComponent } from "../../../../Shared/components/headers/secondary-header/secondary-header.component";
import { ExamsService } from '../../services/exams.service';
import { Daum } from '../../models/iexams.interface';
import { BreadcrumbItem } from '../../../../Shared/models/ibreadcrumb.interface';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [BreadcrumbComponent, SecondaryHeaderComponent, RouterLink],
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.css',
})
export class ExamListComponent implements OnInit, OnDestroy {
  private readonly examsService = inject(ExamsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private queryParamsSubscription?: Subscription;

  readonly diplomaId = signal<string | undefined>(undefined);

  readonly exams = signal<Daum[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly diplomaTitle = computed<string>(() => {
    const list = this.exams();
    return list[0]?.diploma?.title ?? 'Diploma';
  });

  readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const id = this.diplomaId();
    const items: BreadcrumbItem[] = [
      { label: 'Dashboard', link: ['/dashboard'] },
      { label: 'Diplomas', link: ['/dashboard/diplomas'] },
    ];

    if (id) {
      items.push({
        label: this.diplomaTitle(),
        link: ['/dashboard/exams'],
        queryParams: { diplomaId: id },
      });
    } else {
      items.push({ label: this.diplomaTitle() });
    }

    items.push({ label: 'Exams' });
    return items;
  });

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const id = params['diplomaId'];
      this.diplomaId.set(id);
      this.fetchExams(id);
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  private fetchExams(diplomaId?: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.examsService.getExamsByDiploma(diplomaId).subscribe({
      next: (res) => {
        this.exams.set(res.payload?.data || []);
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message || 'Failed to load exams.');
        this.isLoading.set(false);
      }
    });
  }

  // Correct routing for the internal dashboard path
  navigateToExam(exam: Daum): void {
    this.router.navigate(['/dashboard/questions'], {
      queryParams: {
        examId: exam.id,
        duration: exam.duration,
        title: exam.title,
        diplomaId: this.diplomaId(),
        diplomaTitle: exam.diploma?.title || 'Diploma',
      }
    });
  }
}