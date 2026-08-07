import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { HttpStatusService } from '../services/http-status.service';

const extractErrorMessage = (error: unknown): string => {
    if (error instanceof HttpErrorResponse) {
        if (typeof error.error === 'string') {
            return error.error;
        }

        return (
            (error.error as any)?.message ||
            (error.error as any)?.Error ||
            (error.error as any)?.err ||
            error.message ||
            'An unexpected error occurred. Please try again.'
        );
    }

    return 'An unexpected error occurred. Please try again.';
};

export const httpStatusInterceptor: HttpInterceptorFn = (req, next) => {
    const httpStatus = inject(HttpStatusService);
    httpStatus.increment();
    httpStatus.clearError();

    return next(req).pipe(
        catchError((error: unknown) => {
            httpStatus.setError(extractErrorMessage(error));
            return throwError(() => error);
        }),
        finalize(() => httpStatus.decrement())
    );
};
