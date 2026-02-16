import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';
import { SpeakerDetailPageComponent } from './pages/speaker-detail-page/speaker-detail-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'game' },
  { path: 'signin', component: SignInPageComponent },
  { path: 'game', component: GamePageComponent },
  { path: 'speakers/:id', component: SpeakerDetailPageComponent },
  { path: 'leaderboard', component: LeaderboardPageComponent },
  { path: '**', redirectTo: 'game' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
