import { Injectable, computed, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpStatusService {
    private readonly loadingCount = signal(0);
    readonly isLoading = computed(() => this.loadingCount() > 0);
    readonly errorMessage = signal<string | null>(null);

    increment(): void {
        this.loadingCount.set(this.loadingCount() + 1);
    }

    decrement(): void {
        this.loadingCount.update((count) => Math.max(0, count - 1));
    }

    setError(message: string | null): void {
        this.errorMessage.set(message);
    }

    clearError(): void {
        this.errorMessage.set(null);
    }
}
