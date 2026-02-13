import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

import { Player, SignInResponse } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'tag-rush-player';
  private readonly playerSubject = new BehaviorSubject<Player | null>(this.readStoredPlayer());

  readonly currentPlayer$ = this.playerSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  signIn(nickname: string): Observable<Player> {
    const cleanNickname = nickname.trim();

    return this.http.post<SignInResponse>('/signin', { nickname: cleanNickname }).pipe(
      map((response) => ({
        playerId: response.playerId,
        nickname: response.nickname ?? cleanNickname,
      })),
      tap((player) => this.persistPlayer(player)),
    );
  }

  get currentPlayer(): Player | null {
    return this.playerSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentPlayer?.playerId;
  }

  signOut(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
    this.playerSubject.next(null);
  }

  private persistPlayer(player: Player): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(player));
    }
    this.playerSubject.next(player);
  }

  private readStoredPlayer(): Player | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as Player;
      if (!parsed?.playerId || !parsed?.nickname) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }
}
