import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';
import { WordTokenComponent } from './components/word-token/word-token.component';
import { ClaimWordModalComponent } from './components/claim-word-modal/claim-word-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    GamePageComponent,
    LeaderboardPageComponent,
    WordTokenComponent,
    ClaimWordModalComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
