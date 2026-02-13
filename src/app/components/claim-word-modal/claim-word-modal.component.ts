import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-claim-word-modal',
  standalone: false,
  templateUrl: './claim-word-modal.component.html',
  styleUrl: './claim-word-modal.component.css',
})
export class ClaimWordModalComponent {
  @Input({ required: true }) wordId!: string;
  @Input({ required: true }) label!: string;

  @Output() close = new EventEmitter<void>();
  @Output() claimed = new EventEmitter<string>();

  isSubmitting = false;
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly gameService: GameService,
  ) {}

  claim(): void {
    const player = this.authService.currentPlayer;

    if (!player?.playerId) {
      this.errorMessage = 'Session expired. Please sign in again.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.gameService
      .claimWord(this.wordId, player.playerId)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (response) => {
          const successMessage = response.message ?? `You claimed ${this.label}!`;
          this.claimed.emit(successMessage);
          this.closeModal();
        },
        error: (error: Error) => {
          this.errorMessage = error.message;
        },
      });
  }

  closeModal(): void {
    this.close.emit();
  }
}
