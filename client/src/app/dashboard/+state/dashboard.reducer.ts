import { Action, createReducer, on } from '@ngrx/store';
import { DashboardState, MODE } from './dashboard.interfaces';
import * as DashboardActions from './dashboard.actions';

export const dashboardInitialState: DashboardState = {
    scores: [],
    username: '',
    mode: MODE.easy,
    savedGames: []
};

const reducer = createReducer(
    dashboardInitialState,
    on(DashboardActions.getScoresSuccess, (state, action) => {
        return { ...state, scores: action.scores };
    }),
    on(DashboardActions.getSavedGamesSuccess, (state, action) => {
        return { ...state, savedGames: action.savedGames };
    }),
    on(DashboardActions.selectMode, (state, action) => {
        return { ...state, mode: action.mode };
    }),
    on(DashboardActions.setUsername, (state, action) => {
        return { ...state, username: action.username };
    })
);

export function dashboardReducer(state: DashboardState, action: Action): DashboardState {
    return reducer(state, action);
}
