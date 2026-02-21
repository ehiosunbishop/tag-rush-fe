export interface Player {
  id: number;
  nickname: string;
  token: string;
  score?: number;
}

export interface SignInResponse {
  id: number;
  nickname: string;
  token: string;
}
