import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LeaderboardEntry } from '../../models/leaderboard.models';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard-page',
  standalone: false,
  templateUrl: './leaderboard-page.component.html',
  styleUrl: './leaderboard-page.component.css',
})
export class LeaderboardPageComponent implements OnInit, OnDestroy {
  leaderboard: LeaderboardEntry[] = [];
  isLoading = true;

  private leaderboardSubscription?: Subscription;

  constructor(private readonly leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.leaderboardSubscription = this.leaderboardService.pollLeaderboard(3000).subscribe((entries) => {
      this.leaderboard = entries;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.leaderboardSubscription?.unsubscribe();
  }
}
