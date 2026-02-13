export interface LeaderboardEntry {
  playerId: string;
  nickname: string;
  score: number;
}

export interface LeaderboardResponse {
  leaderboard?: LeaderboardEntry[];
  players?: LeaderboardEntry[];
}
