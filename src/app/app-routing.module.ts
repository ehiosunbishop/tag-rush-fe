import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';
import { SpeakerDetailPageComponent } from './pages/speaker-detail-page/speaker-detail-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { SpeakersPageComponent } from './pages/speakers-page/speakers-page.component';

const routes: Routes = [
  { path: '', component: GamePageComponent },
  { path: 'game', component: GamePageComponent },
  { path: 'join-game', component: SignInPageComponent },
  { path: 'signin', pathMatch: 'full', redirectTo: 'join-game' },
  { path: 'product-details', component: ProductDetailsPageComponent },
  { path: 'speakers', component: SpeakersPageComponent },
  { path: 'speakers/:id', component: SpeakerDetailPageComponent, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: LeaderboardPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
