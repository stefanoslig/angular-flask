import { Injectable } from '@angular/core';
import {  createEffect, ofType, Actions } from '@ngrx/effects';
import { DashboardService } from '../dashboard.service';
import * as DashboardActions from './dashboard.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DashboardEffects {
    gateChanges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardActions.getScores),
            switchMap(action =>
                this.dashboardService.scores().pipe(
                    map(scores => DashboardActions.getScoresSuccess({ scores })),
                    catchError(error => of(DashboardActions.getScoresFail({ error }))),
                ),
            ),
        ),
    );

    getSavedGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardActions.getSavedGames),
            switchMap(action =>
                this.dashboardService.savedGames().pipe(
                    map(savedGames => DashboardActions.getSavedGamesSuccess({ savedGames })),
                    catchError(error => of(DashboardActions.getSavedGamesFail({ error }))),
                ),
            ),
        ),
    );

    constructor(private readonly actions$: Actions, private readonly dashboardService: DashboardService) {}
}
