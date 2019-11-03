import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DashboardState, MODE } from './dashboard.interfaces';
import { dashboardQuery } from './dashboard.selectors';
import * as DashboardActions from './dashboard.actions';

@Injectable({providedIn: 'root'})
export class DashboardFacade {
    scores$ = this.store.pipe(select(dashboardQuery.scores));
    username$ = this.store.pipe(select(dashboardQuery.username));
    mode$ = this.store.pipe(select(dashboardQuery.mode));
    savedGames$ = this.store.pipe(select(dashboardQuery.savedGames));

    constructor(private readonly store: Store<DashboardState>) {}

    scores() {
        this.store.dispatch(DashboardActions.getScores());
    }

    savedGames() {
        this.store.dispatch(DashboardActions.getSavedGames());
    }

    setUsername(username: string) {
        this.store.dispatch(DashboardActions.setUsername({username}));
    }

    selectMode(mode: MODE) {
        this.store.dispatch(DashboardActions.selectMode({mode}));
    }
}
