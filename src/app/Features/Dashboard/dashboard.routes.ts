import { Routes } from '@angular/router';
import { authGuard } from '../../Core/auth/auth.guard';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DiplomasComponent } from './components/diplomas/diplomas.component';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { ExamQuestionsComponent } from './components/exam-questions/exam-questions.component';
import { ExamResultComponent } from './components/exam-result/exam-result.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

export const dashRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'diplomas', pathMatch: 'full' },
      { path: 'diplomas', component: DiplomasComponent, title: 'Diplomas' },
      { path: 'exams', component: ExamListComponent, title: 'Exams' },
      { path: 'questions', component: ExamQuestionsComponent, title: 'Exam Questions' },
      { path: 'results', component: ExamResultComponent, title: 'Exam Results' },
      {
        path: 'settings',
        component: AccountSettingsComponent,
        title: 'Account Settings',
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: ProfileComponent, title: 'Profile' },
          { path: 'change-password', component: ChangePasswordComponent, title: 'Change Password' }
        ]
      }
    ]
  }
];