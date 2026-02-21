import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';
import { SpeakerDetailPageComponent } from './pages/speaker-detail-page/speaker-detail-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'game' },
  { path: 'signin', component: SignInPageComponent },
  { path: 'game', component: GamePageComponent, canActivate: [AuthGuard] },
  { path: 'speakers/:id', component: SpeakerDetailPageComponent, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: LeaderboardPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'game' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
