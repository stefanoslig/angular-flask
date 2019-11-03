
export interface GameboardState {
    word: string;
    progressWord: string[];
    character: string;
    wrongChars: string[];
}

export interface Word {
  status: string;
  word: string;
}

export enum RESULT {
  WIN = 'You Win',
  GAME_OVER = 'Game Over'
}
