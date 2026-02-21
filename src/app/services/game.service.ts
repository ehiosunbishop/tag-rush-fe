import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClaimWordResponse } from '../models/game.models';
import { apiUrl } from '../shared/api/api-url';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private readonly http: HttpClient) {}

  claimWord(word: string): Observable<ClaimWordResponse> {
    return this.http.post<ClaimWordResponse>(apiUrl('/claim-word'), { word: word.trim() });
  }
}
