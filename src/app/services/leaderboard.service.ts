import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay, switchMap, timer } from 'rxjs';

import { LeaderboardEntry, LeaderboardResponse } from '../models/leaderboard.models';

@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  constructor(private readonly http: HttpClient) {}

  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardResponse | LeaderboardEntry[]>('/leaderboard').pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response;
        }

        return response.leaderboard ?? response.players ?? [];
      }),
    );
  }

  pollLeaderboard(intervalMs = 3000): Observable<LeaderboardEntry[]> {
    return timer(0, intervalMs).pipe(
      switchMap(() => this.getLeaderboard().pipe(catchError(() => of([])))),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }
}
