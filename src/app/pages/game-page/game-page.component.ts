import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Player } from '../../models/auth.models';
import { Word } from '../../models/game.models';
import { LeaderboardEntry } from '../../models/leaderboard.models';
import { AuthService } from '../../services/auth.service';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-game-page',
  standalone: false,
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnInit, OnDestroy {
  player: Player | null = null;
  selectedWord: Word | null = null;
  toastMessage = '';
  topPlayers: LeaderboardEntry[] = [];

  readonly words: Word[] = [
    { wordId: '1', label: '#Angular' },
    { wordId: '2', label: '@Frontend' },
    { wordId: '3', label: '#Tailwind' },
    { wordId: '4', label: '@RxJS' },
    { wordId: '5', label: '#SpeedTap' },
    { wordId: '6', label: '@TagRush' },
    { wordId: '7', label: '#ClaimMe' },
    { wordId: '8', label: '@TopScore' },
    { wordId: '9', label: '#RankUp' },
    { wordId: '10', label: '@3SecPoll' },
  ];

  private leaderboardSubscription?: Subscription;
  private toastTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly authService: AuthService,
    private readonly leaderboardService: LeaderboardService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.player = this.authService.currentPlayer;

    this.leaderboardSubscription = this.leaderboardService.pollLeaderboard(3000).subscribe((entries) => {
      this.topPlayers = entries.slice(0, 5);
    });
  }

  ngOnDestroy(): void {
    this.leaderboardSubscription?.unsubscribe();

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }

  openClaimModal(word: Word): void {
    this.selectedWord = word;
  }

  closeClaimModal(): void {
    this.selectedWord = null;
  }

  handleClaimed(message: string): void {
    this.toastMessage = message;
    this.selectedWord = null;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      this.toastMessage = '';
    }, 2500);
  }

  signOut(): void {
    this.authService.signOut();
    void this.router.navigate(['/signin']);
  }
}
