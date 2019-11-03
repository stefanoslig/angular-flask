import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.interfaces';

const dashboardState = createFeatureSelector<DashboardState>('dashboard');
const scores = createSelector(
  dashboardState,
    state => state.scores.slice(0, 10), // a list of maximum 10 scores should be visible
);
const username = createSelector(
  dashboardState,
    state => state.username
);
const mode = createSelector(
  dashboardState,
    state => state.mode
);

const savedGames = createSelector(
  dashboardState,
    state => state.savedGames.slice(0, 10), // a list of maximum 10 games should be visible
);

export const dashboardQuery = {
  scores,
  username,
  mode,
  savedGames
};
