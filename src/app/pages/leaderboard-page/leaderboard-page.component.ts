import { Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ClaimWordResponse, Word } from '../../models/game.models';
import { LeaderboardEntry } from '../../models/leaderboard.models';
import { AuthService } from '../../services/auth.service';
import { LeaderboardService } from '../../services/leaderboard.service';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-leaderboard-page',
  standalone: false,
  templateUrl: './leaderboard-page.component.html',
  styleUrl: './leaderboard-page.component.css',
})
export class LeaderboardPageComponent {
  private readonly destroyRef = inject(DestroyRef);
  private hasFirstEmission = false;
  private previousScores = new Map<string, number>();
  private clearHighlightTimeout?: ReturnType<typeof setTimeout>;

  readonly leaderboard;
  readonly isLoading = signal(true);
  readonly highlightedNicknames = signal<Set<string>>(new Set());
  readonly currentPlayer;
  readonly canClaimWords;
  readonly hiddenWords: Word[] = [
    { wordId: 'lb1', label: '#rankings' },
    { wordId: 'lb2', label: '@streaks' },
    { wordId: 'lb3', label: '$points' },
    { wordId: 'lb4', label: '!climbers' },
    { wordId: 'lb5', label: '%leaders' },
  ];

  selectedWord: Word | null = null;
  foundWords = new Set<string>();

  constructor(
    private readonly authService: AuthService,
    private readonly leaderboardService: LeaderboardService,
    private readonly toastService: ToastService,
  ) {
    this.leaderboard = toSignal(this.leaderboardService.pollLeaderboard(), {
      initialValue: [] as LeaderboardEntry[],
    });
    this.currentPlayer = toSignal(this.authService.currentPlayer$, { initialValue: null });
    this.canClaimWords = computed(() => !!this.currentPlayer()?.token);

    effect(() => {
      const entries = this.leaderboard();

      if (!this.hasFirstEmission) {
        this.hasFirstEmission = true;
        this.isLoading.set(false);
        this.previousScores = new Map(entries.map((player) => [player.nickname, player.score]));
        return;
      }

      const changed = new Set<string>();
      for (const player of entries) {
        const previous = this.previousScores.get(player.nickname);
        if (previous !== undefined && previous !== player.score) {
          changed.add(player.nickname);
        }
      }

      this.previousScores = new Map(entries.map((player) => [player.nickname, player.score]));

      if (!changed.size) {
        return;
      }

      this.highlightedNicknames.set(changed);
      if (this.clearHighlightTimeout) {
        clearTimeout(this.clearHighlightTimeout);
      }

      this.clearHighlightTimeout = setTimeout(() => {
        this.highlightedNicknames.set(new Set());
      }, 650);
    });

    this.destroyRef.onDestroy(() => {
      if (this.clearHighlightTimeout) {
        clearTimeout(this.clearHighlightTimeout);
      }
    });
  }

  trackByNickname(_: number, player: LeaderboardEntry): string {
    return player.nickname;
  }

  isHighlighted(nickname: string): boolean {
    return this.highlightedNicknames().has(nickname);
  }

  handleWordClick(wordLabel: string): void {
    if (!this.canClaimWords()) {
      return;
    }

    const word = this.hiddenWords.find((item) => item.label === wordLabel);
    if (!word || this.foundWords.has(word.label)) {
      return;
    }

    this.selectedWord = word;
  }

  closeClaimModal(): void {
    this.selectedWord = null;
  }

  handleClaimed(response: ClaimWordResponse): void {
    if (this.selectedWord) {
      this.foundWords.add(this.selectedWord.label);
    }

    this.selectedWord = null;
    this.toastService.success(`${response.word} claimed (+${response.pointsAwarded}).`);
  }

  isFoundWord(word: string): boolean {
    return this.foundWords.has(word);
  }

  displayWord(wordLabel: string): string {
    if (this.canClaimWords() || wordLabel.length < 2) {
      return wordLabel;
    }

    return wordLabel.slice(1);
  }
}
