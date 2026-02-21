import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, shareReplay, switchMap, timer } from 'rxjs';

import { LeaderboardEntry } from '../models/leaderboard.models';
import { apiUrl } from '../shared/api/api-url';

@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  constructor(private readonly http: HttpClient) {}

  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardEntry[]>(apiUrl('/leaderboard'));
  }

  pollLeaderboard(intervalMs = 3000): Observable<LeaderboardEntry[]> {
    return timer(0, intervalMs).pipe(
      switchMap(() => this.getLeaderboard().pipe(catchError(() => of([])))),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }
}
