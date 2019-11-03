
export interface DashboardState {
    scores: Score[];
    savedGames: SavedGame[];
    mode: MODE;
    username: string;
}

export interface Score {
  score: number;
  username: string;
  created_date: string;
}

export interface SavedGame {
  state: number;
  username: string;
  created_date: string;
}

export interface SavedGames {
  status: string;
  states: SavedGame[];
}

export interface Scores {
  status: string;
  scores: Score[];
}

export enum MODE {
  easy = 'EASY',
  difficult = 'DIFFICULT'
}
