export interface Word {
  wordId: string;
  label: string;
}

export interface ClaimWordResponse {
  success?: boolean;
  message?: string;
  score?: number;
}
