import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-sign-in-page',
  standalone: false,
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css',
})
export class SignInPageComponent implements OnInit {
  nickname = '';
  isSubmitting = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      void this.router.navigate(['/game']);
    }
  }

  signIn(): void {
    const cleanNickname = this.nickname.trim();

    if (!cleanNickname) {
      this.toastService.error('Nickname is required.');
      return;
    }
    if (cleanNickname.length < 2 || cleanNickname.length > 30) {
      this.toastService.error('Nickname must be between 2 and 30 characters.');
      return;
    }

    this.isSubmitting = true;

    this.authService.signIn(cleanNickname).subscribe({
      next: (player) => {
        this.toastService.success(`Welcome, ${player.nickname}!`);
        void this.router.navigate(['/game']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409 && error.error?.status === 'nickname_taken') {
          this.toastService.error(error.error?.message ?? 'Nickname is already in use.');
        } else {
          this.toastService.error('Sign in failed. Please try again.');
        }
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
