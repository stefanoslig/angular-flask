import { createAction, props } from '@ngrx/store';
import { Score, MODE, SavedGame } from './dashboard.interfaces';

export const getScores = createAction('[Dashboard] Scores');
export const getScoresSuccess = createAction(
    '[Dashboard] Scores Success',
    props<{ scores: Score[] }>(),
);
export const getScoresFail = createAction('[Dashboard] Scores Fail', props<{ error: Error }>());
export const getSavedGames = createAction('[Dashboard] Saved Games');
export const getSavedGamesSuccess = createAction(
    '[Dashboard] Saved Games Success',
    props<{ savedGames: SavedGame[] }>(),
);
export const getSavedGamesFail = createAction('[Dashboard] Saved Games Fail', props<{ error: Error }>());
export const selectMode = createAction('[Dashboard] Select Mode', props<{mode: MODE}>());
export const setUsername = createAction('[Dashboard] Set Username', props<{username: string}>());

