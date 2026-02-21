import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';
import { SpeakerDetailPageComponent } from './pages/speaker-detail-page/speaker-detail-page.component';
import { WordTokenComponent } from './components/word-token/word-token.component';
import { ClaimWordModalComponent } from './components/claim-word-modal/claim-word-modal.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ToastComponent } from './shared/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    GamePageComponent,
    LeaderboardPageComponent,
    SpeakerDetailPageComponent,
    WordTokenComponent,
    ClaimWordModalComponent,
    ToastComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
