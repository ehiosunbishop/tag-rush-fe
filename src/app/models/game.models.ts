export interface Word {
  wordId: string;
  label: string;
}

export interface ClaimWordResponse {
  status: 'claimed';
  word: string;
  symbol: string;
  playerId: number;
  pointsAwarded: number;
  player: {
    id: number;
    nickname: string;
    score: number;
  };
}
