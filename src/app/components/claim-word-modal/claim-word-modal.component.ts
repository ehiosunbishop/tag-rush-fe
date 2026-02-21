import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { ClaimWordResponse } from '../../models/game.models';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-claim-word-modal',
  standalone: false,
  templateUrl: './claim-word-modal.component.html',
  styleUrl: './claim-word-modal.component.css',
})
export class ClaimWordModalComponent {
  @Input({ required: true }) word!: string;
  @Input({ required: true }) label!: string;

  @Output() close = new EventEmitter<void>();
  @Output() claimed = new EventEmitter<ClaimWordResponse>();

  isSubmitting = false;
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly gameService: GameService,
    private readonly toastService: ToastService,
  ) {}

  claim(): void {
    const player = this.authService.currentPlayer;

    if (!player?.token) {
      this.errorMessage = 'Session expired. Please sign in again.';
      this.toastService.error(this.errorMessage);
      return;
    }
    if (this.word.trim().length < 2) {
      this.errorMessage = 'Word must be at least 2 characters.';
      this.toastService.error(this.errorMessage);
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.gameService
      .claimWord(this.word)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (response) => {
          this.claimed.emit(response);
          this.closeModal();
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = this.resolveErrorMessage(error);
          this.toastService.error(this.errorMessage);
        },
      });
  }

  closeModal(): void {
    this.close.emit();
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 409 && error.error?.status === 'already_claimed') {
      return `${error.error?.word ?? this.word} was already claimed.`;
    }

    if (error.status === 422 && Array.isArray(error.error?.acceptedSymbols)) {
      return `Invalid symbol. Supported: ${error.error.acceptedSymbols.join(', ')}`;
    }

    if (error.status === 401) {
      return 'Your session is invalid. Please sign in again.';
    }

    if (error.status === 404) {
      return error.error?.message ?? 'Player not found.';
    }

    return error.error?.message ?? 'Unable to claim this word. Please try again.';
  }
}
