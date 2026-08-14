

import { Routes } from '@angular/router';
import { authGuard } from '../../Core/auth/auth.guard';

export const dashRoutes: Routes = [
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./layout/dashboard-layout/dashboard-layout.component').then(
                (m) => m.DashboardLayoutComponent
            ),
        children: [
            { path: '', redirectTo: 'diplomas', pathMatch: 'full' },
            {
                path: 'diplomas',
                loadComponent: () =>
                    import('./components/diplomas/diplomas.component').then(
                        (m) => m.DiplomasComponent
                    ),
                title: 'Diplomas',
            },
            {
                path: 'exams',
                loadComponent: () =>
                    import('./components/exam-list/exam-list.component').then(
                        (m) => m.ExamListComponent
                    ),
                title: 'Exams',
            },
            {
                path: 'questions',
                loadComponent: () =>
                    import('./components/exam-questions/exam-questions.component').then(
                        (m) => m.ExamQuestionsComponent
                    ),
                title: 'Exam Questions',
            },
            {
                path: 'results',
                loadComponent: () =>
                    import('./components/exam-result/exam-result.component').then(
                        (m) => m.ExamResultComponent
                    ),
                title: 'Exam Results',
            },
            {
                path: 'settings',
                loadComponent: () =>
                    import('./components/account-settings/account-settings.component').then(
                        (m) => m.AccountSettingsComponent
                    ),
                title: 'Account Settings',
                children: [
                    { path: '', redirectTo: 'profile', pathMatch: 'full' },
                    {
                        path: 'profile',
                        loadComponent: () =>
                            import('./components/profile/profile.component').then(
                                (m) => m.ProfileComponent
                            ),
                        title: 'Profile',
                    },
                    {
                        path: 'change-password',
                        loadComponent: () =>
                            import('./components/change-password/change-password.component').then(
                                (m) => m.ChangePasswordComponent
                            ),
                        title: 'Change Password',
                    },
                ],
            },
        ],
    },
];