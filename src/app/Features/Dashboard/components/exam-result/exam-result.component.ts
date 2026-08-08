import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../../../../Shared/components/headers/breadcrumb/breadcrumb.component";
import { Question } from '../../models/iquestions.interface';
import { SubmissionsService } from '../../services/result.service';
import { ResultQuestion, Analytic } from '../../models/iresult.interface';
import { BreadcrumbItem } from '../../../../Shared/models/ibreadcrumb.interface';



@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './exam-result.component.html',
  styleUrl: './exam-result.component.css',
})
export class ExamResultComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly submissionsService = inject(SubmissionsService);

  readonly examTitle = signal<string>('Exam Results');
  readonly diplomaId = signal<string>('');
  readonly diplomaTitle = signal<string>('Diploma');
  readonly categoryName = signal<string>('Frontend Development - CSS Quiz');
  readonly questions = signal<ResultQuestion[]>([]);
  readonly currentIndex = signal<number>(0);

  readonly correctCount = signal<number>(0);
  readonly incorrectCount = signal<number>(0);

  readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const id = this.diplomaId();
    const items: BreadcrumbItem[] = [
      { label: 'Dashboard', link: ['/dashboard'] },
      { label: 'Diplomas', link: ['/dashboard/diplomas'] },
    ];

    items.push({
      label: 'Exams',
      link: ['/dashboard/exams'],
      queryParams: id ? { diplomaId: id } : undefined,
    });

    items.push({ label: this.examTitle() });
    items.push({ label: 'Results' });
    return items;
  });



  // Total number of questions
  readonly totalCount = computed(() => this.questions().length);
  readonly totalQuestions = computed(() => this.questions().length);

  readonly headerTitle = computed(() => {
    const diploma = this.diplomaTitle();
    const exam = this.examTitle();
    return diploma ? `${diploma} - ${exam}` : exam;
  });

  // Ratio of correct answers used to calculate the donut chart
  readonly correctPercentage = computed(() => {
    if (this.totalCount() === 0) return 0;
    return (this.correctCount() / this.totalCount()) * 100;
  });

  readonly progressPercentage = computed(() => {
    const total = this.totalQuestions();
    if (total === 0) return 0;
    return ((this.currentIndex() + 1) / total) * 100;
  });

  ngOnInit(): void {
    this.loadNavigationData();
  }

  private loadNavigationData(): void {
    const navState = typeof window !== 'undefined' && window.history ? window.history.state : null;

    if (navState && navState.questions) {
      const rawQuestions: Question[] = navState.questions;
      const selectedAnswers: Record<string, string> = navState.selectedAnswers || {};
      const analytics: Analytic[] = navState.submissionResult?.analytics || [];
      const analyticsMap = new Map<string, Analytic>();
      analytics.forEach(a => { if (a?.questionId) analyticsMap.set(a.questionId, a); });

      if (navState.examTitle) {
        this.examTitle.set(navState.examTitle);
      }

      if (navState.diplomaId) {
        this.diplomaId.set(navState.diplomaId);
      }

      if (navState.diplomaTitle) {
        this.diplomaTitle.set(navState.diplomaTitle);
      }

      if (typeof navState.currentIndex === 'number') {
        this.currentIndex.set(navState.currentIndex);
      }

      // If the submission response contains analytics, enrich them from the API
      if (navState.submissionResult?.submission) {
        this.correctCount.set(navState.submissionResult.submission.correctAnswers);
        this.incorrectCount.set(navState.submissionResult.submission.wrongAnswers);
      } else {
        // Fallback local calculation
        let correct = 0;
        rawQuestions.forEach(q => {
          const userSelectedId = selectedAnswers[q.id];
          const correctAnswer = q.answers.find(a => a.isCorrect);
          if (userSelectedId && correctAnswer && userSelectedId === correctAnswer.id) {
            correct++;
          }
        });
        this.correctCount.set(correct);
        this.incorrectCount.set(rawQuestions.length - correct);
      }

      // Map of questions and answers compatible with the template
      const mappedQuestions: ResultQuestion[] = rawQuestions.map(q => {
        const userSelectedId = selectedAnswers[q.id];
        const analytic = analyticsMap.get(q.id);

        return {
          id: q.id,
          text: q.text,
          answers: q.answers.map(ans => {
            const isCorrect = analytic?.correctAnswer?.id ? analytic.correctAnswer.id === ans.id : ans.isCorrect;
            const isSelected = analytic?.selectedAnswer?.id ? analytic.selectedAnswer.id === ans.id : userSelectedId === ans.id;
            return {
              id: ans.id,
              text: ans.text,
              isCorrect,
              isSelected
            };
          })
        };
      });

      this.questions.set(mappedQuestions);
    }
  }

  restartExam(): void {
    const id = this.diplomaId();
    this.router.navigate(['/dashboard/exams'], id ? { queryParams: { diplomaId: id } } : undefined);
  }

  exploreExams(): void {
    const id = this.diplomaId();
    this.router.navigate(['/dashboard/exams'], id ? { queryParams: { diplomaId: id } } : undefined);
  }

  goBack(): void {
    const id = this.diplomaId();
    this.router.navigate(['/dashboard/exams'], id ? { queryParams: { diplomaId: id } } : undefined);
  }
}