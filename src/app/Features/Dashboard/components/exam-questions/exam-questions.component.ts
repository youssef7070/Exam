import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionsService } from '../../services/questions.service';
import { SubmissionsService } from '../../services/resutl.service';
import { Question } from '../../models/iquestions.interface';
import { BreadcrumbComponent } from "../../../../Shared/components/headers/breadcrumb/breadcrumb.component";
import { BreadcrumbItem } from '../../../../Shared/models/ibreadcrumb.interface';

@Component({
  selector: 'app-exam-questions',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './exam-questions.component.html',
  styleUrl: './exam-questions.component.css'
})
export class ExamQuestionsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly questionsService = inject(QuestionsService);
  private readonly submissionsService = inject(SubmissionsService);

  readonly examId = signal<string>('');
  readonly diplomaId = signal<string>('');
  readonly diplomaTitle = signal<string>('Diploma');
  readonly questions = signal<Question[]>([]);
  readonly currentIndex = signal<number>(0);
  readonly selectedAnswers = signal<Record<string, string>>({});
  readonly examTitle = signal<string>('Exam Questions');
  readonly timeLeft = signal<number>(0);
  readonly initialDuration = signal<number>(0);

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
    return items;
  });

  private timerInterval: any;

  readonly currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  readonly totalQuestions = computed(() => this.questions().length);



  readonly progressPercentage = computed(() => {
    const total = this.totalQuestions();
    if (total === 0) return 0;
    return (this.currentIndex() / total) * 100;
  });

  readonly formattedTime = computed(() => {
    const minutes = Math.floor(this.timeLeft() / 60);
    const seconds = this.timeLeft() % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  readonly timePercentage = computed(() => {
    const total = this.initialDuration();
    if (total === 0) return 0;
    return (this.timeLeft() / total) * 100;
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['examId'];
      const duration = Number(params['duration']) || 30;
      const title = params['title'];
      const diplomaId = params['diplomaId'];
      const diplomaTitle = params['diplomaTitle'];

      if (id) {
        this.examId.set(id);
        this.loadQuestions(id);
      }
      if (title) this.examTitle.set(title);
      if (diplomaId) this.diplomaId.set(diplomaId);
      if (diplomaTitle) this.diplomaTitle.set(diplomaTitle);
      this.startTimer(duration * 60);
    });
  }

  private startTimer(seconds: number): void {
    this.initialDuration.set(seconds);
    this.timeLeft.set(seconds);

    this.timerInterval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(time => time - 1);
      } else {
        this.stopTimer();
        this.submitExam();
      }
    }, 1000);
  }

  private loadQuestions(examId: string): void {
    this.questionsService.getQuestionsByExam(examId).subscribe({
      next: (res) => {
        const fetchedQuestions = res.payload?.questions || [];
        this.questions.set(fetchedQuestions);
      },
      error: (err) => console.error('Error fetching questions', err)
    });
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  selectAnswer(answerId: string): void {
    const qId = this.currentQuestion()?.id;
    if (qId) {
      this.selectedAnswers.update(prev => ({ ...prev, [qId]: answerId }));
    }
  }

  nextQuestion(): void {
    if (this.currentIndex() < this.totalQuestions() - 1) {
      this.currentIndex.update(i => i + 1);
    }
  }

  previousQuestion(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    }
  }

  goBack(): void {
    const id = this.diplomaId();
    this.router.navigate(['/dashboard/exams'], id ? { queryParams: { diplomaId: id } } : undefined);
  }

  // 3. Submit the answers to the server
  submitExam(): void {
    this.stopTimer();

    // Convert the answer dictionary into the format required by the API
    const answersPayload = Object.entries(this.selectedAnswers()).map(([questionId, answerId]) => ({
      questionId,
      answerId
    }));

    const payload = {
      examId: this.examId(),
      answers: answersPayload
    };

    this.submissionsService.submitExam(payload).subscribe({
      next: (res) => {
        // Redirect the user to the results page with the submission data
        this.router.navigate(['/dashboard/results'], {
          state: {
            submissionResult: res.payload,
            questions: this.questions(),
            selectedAnswers: this.selectedAnswers(),
            examTitle: this.examTitle(),
            diplomaId: this.diplomaId(),
          }
        });
      },
      error: (err) => {
        console.error('Error submitting exam', err);
        // Redirect even on error to avoid leaving the UI in a broken state
        this.router.navigate(['/dashboard/results'], {
          state: {
            questions: this.questions(),
            selectedAnswers: this.selectedAnswers(),
            examTitle: this.examTitle(),
            diplomaId: this.diplomaId(),
          }
        });
      }
    });
  }
}