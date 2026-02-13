import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-page',
  standalone: false,
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css',
})
export class SignInPageComponent implements OnInit {
  nickname = '';
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      void this.router.navigate(['/game']);
    }
  }

  signIn(): void {
    const cleanNickname = this.nickname.trim();

    if (!cleanNickname) {
      this.errorMessage = 'Nickname is required.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.signIn(cleanNickname).subscribe({
      next: () => {
        void this.router.navigate(['/game']);
      },
      error: () => {
        this.errorMessage = 'Sign in failed. Please try another nickname.';
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
