import { createAction, props } from '@ngrx/store';
import { GameboardState } from './gameboard.interfaces';

export const getRandomWord = createAction('[Gameboard] Get Random Word');
export const getRandomWordSuccess = createAction('[Gameboard] Get Random Word Success', props<{ word: string }>());
export const getRandomWordFail = createAction('[Gameboard] Get Random Word Fail', props<{ error: Error }>());
export const saveGame = createAction('[Gameboard] Save Game');
export const saveGameSuccess = createAction('[Gameboard] Save Game Success');
export const saveGameFail = createAction('[Gameboard] Save Game Fail', props<{ error: Error }>());
export const setCharacter = createAction('[Gameboard] Set Character', props<{ char: string }>());
export const resetGame = createAction('[Gameboard] Reset Game');
export const reduceLifes = createAction('[Gameboard] Reduce Lifes');
export const saveScore = createAction('[Gameboard] Save Score', props<{ score: number }>());
export const saveScoreSuccess = createAction('[Gameboard] Save Score Success');
export const saveScoreFail = createAction('[Gameboard] Save Score Fail', props<{ error: Error }>());
export const setState = createAction('[Gameboard] Set State', props<{ state: GameboardState }>());
