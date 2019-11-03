import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameboardState, RESULT } from './gameboard.interfaces';
import { dashboardQuery } from '../../dashboard/+state/dashboard.selectors';
import { MODE } from '@dashboard/+state/dashboard.interfaces';

const gameboardState = createFeatureSelector<GameboardState>('gameboard');
const word = createSelector(
    gameboardState,
    state => state.word,
);
const progressWord = createSelector(
    gameboardState,
    state => state.progressWord,
);
const wrongChars = createSelector(
    gameboardState,
    state => state.wrongChars,
);
const lives = createSelector(
    wrongChars,
    (chars: string[]) => 5 - chars.length,
);
const score = createSelector(
    wrongChars,
    lives,
    dashboardQuery.mode,
    (w: string[], l: number, mode: MODE) => (l > 0 ? l * 10 * (mode === 'EASY' ? 5 : 10) - w.length * 10 : 0),
);
const result = createSelector(
    progressWord,
    word,
    lives,
    (p: string[], w: string, lives: number) => {
        if (p.filter(i => i !== '*').length === w.split('').length) {
            return RESULT.WIN;
        }
        if (lives < 1) {
            return RESULT.GAME_OVER;
        }
        return undefined;
    },
);

export const gameboardQuery = {
  gameboardState,
    word,
    progressWord,
    wrongChars,
    lives,
    score,
    result,
};
