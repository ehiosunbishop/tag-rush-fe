import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClaimWordResponse } from '../models/game.models';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private readonly http: HttpClient) {}

  claimWord(word: string): Observable<ClaimWordResponse> {
    return this.http.post<ClaimWordResponse>('/claim-word', { word: word.trim() });
  }
}
