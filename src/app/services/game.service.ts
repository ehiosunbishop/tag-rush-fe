import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

import { ClaimWordResponse } from '../models/game.models';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private readonly http: HttpClient) {}

  claimWord(wordId: string, playerId: string): Observable<ClaimWordResponse> {
    return this.http.post<ClaimWordResponse>('/claim-word', { wordId, playerId }).pipe(
      map((response) => ({
        ...response,
        success: response.success ?? true,
      })),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message ?? 'Unable to claim this word. Please try again.';
        return throwError(() => new Error(message));
      }),
    );
  }
}
