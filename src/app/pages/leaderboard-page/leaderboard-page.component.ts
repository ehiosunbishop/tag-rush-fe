import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { LeaderboardEntry } from '../../models/leaderboard.models';
import { LeaderboardService } from '../../services/leaderboard.service';

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

  constructor(private readonly leaderboardService: LeaderboardService) {
    this.leaderboard = toSignal(this.leaderboardService.pollLeaderboard(), {
      initialValue: [] as LeaderboardEntry[],
    });

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
}
