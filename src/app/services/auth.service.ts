import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Player, SignInResponse } from '../models/auth.models';
import { apiUrl } from '../shared/api/api-url';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'tag-rush-player';
  private readonly playerSubject = new BehaviorSubject<Player | null>(this.readStoredPlayer());

  readonly currentPlayer$ = this.playerSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  signIn(nickname: string): Observable<SignInResponse> {
    const cleanNickname = nickname.trim();

    return this.http.post<SignInResponse>(apiUrl('/signin'), { nickname: cleanNickname }).pipe(
      tap((response) => this.persistPlayer(response)),
    );
  }

  get currentPlayer(): Player | null {
    return this.playerSubject.value;
  }

  getAccessToken(): string | null {
    return this.currentPlayer?.token ?? null;
  }

  isAuthenticated(): boolean {
    return !!this.currentPlayer?.token;
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
      if (!parsed?.id || !parsed?.nickname || !parsed?.token) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }
}
